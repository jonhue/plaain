import './Find.scss'
import FlexSearch, { Index } from 'flexsearch'
import React, { useCallback, useMemo, useState } from 'react'
import HorizontalSlide from '../components/HorizontalSlide'
import { IMediaItem } from '../types/items/Item'
import { Movie } from '../types/items/Movie'
import { Show } from '../types/items/Show'
import { useAsyncMemo } from 'use-async-memo'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const QUERY_PARAMETER = 'q'

const buildIndex = <T extends IMediaItem>(items: T[]) => {
  const index: Index<T> = FlexSearch.create()
  items.forEach((item) => index.add(item))
  return index
}

const find = async <T extends IMediaItem>(
  index: Index<T>,
  query: string,
): Promise<T[]> => index.search(query)

type FindViewProps = {
  movies: Movie[]
  shows: Show[]
  query: string | null
}

const FindView = ({ movies, shows, query: initalQuery }: FindViewProps) => {
  const { t } = useTranslation()
  const history = useHistory()

  const [query, setQuery] = useState(initalQuery || '')

  const moviesIndex = useMemo(() => buildIndex(movies), [movies])
  const showsIndex = useMemo(() => buildIndex(shows), [shows])

  const foundMovies = useAsyncMemo(() => find(moviesIndex, query), [
    moviesIndex,
    query,
  ])
  const foundShows = useAsyncMemo(() => find(showsIndex, query), [
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
          value={query}
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

export default FindView
