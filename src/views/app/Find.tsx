import './Find.scss'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import React, { useCallback, useMemo, useState } from 'react'
import { movieSelector, moviesSelector } from '../../store/movies/selectors'
import { showSelector, showsSelector } from '../../store/shows/selectors'
import { HorizontalSlide } from '../../components/HorizontalSlide'
import { Index } from 'flexsearch'
import { Item } from '../../types/items/Item'
import { RootState } from '../../store'
import { notUndefined } from '../../util'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const QUERY_PARAMETER = 'q'

const buildIndex = <T extends Item>(
  items: T[],
  itemToText: (item: T) => string,
) => {
  const index = new Index({
    tokenize: 'forward',
  })
  items.forEach((item) => index.add(item.id, itemToText(item)))
  return index
}

export const Find = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
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

  const foundMovies = useMemo(() => {
    const result = moviesIndex.search(query)
    return result
      .map((id) => movieSelector(id as string)(movies))
      .filter(notUndefined)
  }, [moviesIndex, query])
  const foundShows = useMemo(() => {
    const result = showsIndex.search(query)
    return result
      .map((id) => showSelector(id as string)(shows))
      .filter(notUndefined)
  }, [showsIndex, query])

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      navigate(`/app/find?${QUERY_PARAMETER}=${event.target.value}`, {
        replace: true,
      })
      setQuery(event.target.value)
    },
    [navigate, setQuery],
  )

  return moviesSelector(movies).length > 0 ||
    showsSelector(shows).length > 0 ? (
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
  ) : (
    <Navigate to="/app" />
  )
}
