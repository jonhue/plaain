import './Find.scss'
import FlexSearch, { Index } from 'flexsearch'
import React, { useCallback, useMemo, useState } from 'react'
import { movieSelector, moviesSelector } from '../../store/movies/selectors'
import { showSelector, showsSelector } from '../../store/shows/selectors'
import { useHistory, useLocation } from 'react-router-dom'
import { HorizontalSlide } from '../../components/HorizontalSlide'
import { Item } from '../../types/items/Item'
import { RootState } from '../../store'
import { notUndefined } from '../../util'
import { useAsyncMemo } from 'use-async-memo'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const QUERY_PARAMETER = 'q'

const buildIndex = <T extends Item>(
  items: T[],
  itemToText: (item: T) => string,
) => {
  const index: Index<string> = FlexSearch.create()
  items.forEach((item) => {
    // a workaround to use strings as keys
    const key = item.id as unknown as number

    index.add(key, itemToText(item))
  })
  return index
}

export const Find = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()

  const initialQuery = useMemo(
    () => new URLSearchParams(location.search).get(QUERY_PARAMETER),
    [location],
  )

  const { movies, shows } = useSelector((state: RootState) => ({
    movies: state.movies,
    shows: state.shows,
  }))

  const [query, setQuery] = useState(initialQuery || '')

  const moviesIndex = useMemo(
    () =>
      buildIndex(
        moviesSelector(movies),
        (movie) => `${movie.title};${movie.summary}`,
      ),
    [movies],
  )
  const showsIndex = useMemo(
    () =>
      buildIndex(
        showsSelector(shows),
        (show) => `${show.title};${show.summary}`,
      ),
    [shows],
  )

  const foundMovies = useAsyncMemo(async () => {
    const result = await moviesIndex.search(query)
    return result.map((id) => movieSelector(id)(movies)).filter(notUndefined)
  }, [moviesIndex, query])
  const foundShows = useAsyncMemo(async () => {
    const result = await showsIndex.search(query)
    return result.map((id) => showSelector(id)(shows)).filter(notUndefined)
  }, [showsIndex, query])

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      history.replace(`/app/find?${QUERY_PARAMETER}=${event.target.value}`)
      setQuery(event.target.value)
    },
    [history, setQuery],
  )

  return (
    <div className="Find">
      <form>
        <input
          autoFocus
          value={query}
          placeholder={t('Search your library')}
          onChange={handleInputChange}
        />
      </form>

      {foundMovies && Object.keys(foundMovies).length > 0 && (
        <section>
          <h2>{t('Movies')}</h2>
          <HorizontalSlide items={foundMovies} id="movies" />
        </section>
      )}

      {foundShows && Object.keys(foundShows).length > 0 && (
        <section>
          <h2>{t('TV shows')}</h2>
          <HorizontalSlide items={foundShows} id="shows" />
        </section>
      )}
    </div>
  )
}
