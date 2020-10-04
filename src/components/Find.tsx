import './Find.scss'
import FlexSearch, { Index } from 'flexsearch'
import React, { useCallback, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import HorizontalSlide from '../components/HorizontalSlide'
import { IMediaItem } from '../types/items/Item'
import { Movie } from '../types/items/Movie'
import { Show } from '../types/items/Show'
import { useTranslation } from 'react-i18next'

const QUERY_PARAMETER = 'q'

const buildIndex = <T extends IMediaItem>(
  items: T[],
  text: (item: T) => string,
) => {
  const index: Index<number> = FlexSearch.create()
  items.forEach((item) => {
    index.add(Number.parseInt(item.id), text(item))
  })
  return index
}

const find = <T extends IMediaItem>(
  index: Index<number>,
  items: T[],
  query: string | null,
) =>
  index
    .search(query || '')
    .then((results) =>
      results.map((id) => items.find((item) => item.id === id.toString())),
    )

type FindProps = {
  movies: Movie[]
  shows: Show[]
}

const Find = ({ movies, shows }: FindProps) => {
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()

  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get(QUERY_PARAMETER),
  )

  const moviesIndex = useMemo(
    () =>
      buildIndex(movies, (movie: Movie) => `${movie.title};${movie.summary}`),
    [movies],
  )
  const showsIndex = useMemo(
    () => buildIndex(shows, (show: Show) => `${show.title};${show.summary}`),
    [shows],
  )

  const foundMovies = useMemo(() => find(moviesIndex, movies, query), [
    movies,
    moviesIndex,
    query,
  ])
  const foundShows = useMemo(() => find(showsIndex, shows, query), [
    shows,
    showsIndex,
    query,
  ])

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
          value={query || ''}
          placeholder={t('Search your library')}
          onChange={handleInputChange}
        />
      </form>

      {Object.keys(foundMovies).length > 0 && (
        <section>
          <h2>{t('Movies')}</h2>
          <HorizontalSlide items={foundMovies} id="movies" />
        </section>
      )}

      {Object.keys(foundShows).length > 0 && (
        <section>
          <h2>{t('TV shows')}</h2>
          <HorizontalSlide items={foundShows} id="shows" />
        </section>
      )}
    </div>
  )
}

export default Find
