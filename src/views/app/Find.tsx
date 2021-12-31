import './Find.scss'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import React, { useCallback, useMemo, useState } from 'react'
import {
  buildMovieSearchKey,
  buildPersonSearchKey,
  buildShowSearchKey,
} from '../../services/find'
import { movieSelector, moviesSelector } from '../../store/movies/selectors'
import { showSelector, showsSelector } from '../../store/shows/selectors'
import { HorizontalSlide } from '../../components/HorizontalSlide'
import { Index } from 'flexsearch'
import { RootState } from '../../store'
import { notUndefined } from '../../util'
import { peopleSelector } from '../../store/people/selectors'
import { personSelector } from '../../store/selectors'
import { seasonsByShowSelector } from '../../store/seasons/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const QUERY_PARAMETER = 'q'

type SearchItem = {
  id: string
}

const buildIndex = <T extends SearchItem>(
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

  const { people, movies, seasons, shows, state } = useSelector(
    (state: RootState) => ({
      people: state.people,
      movies: state.movies,
      seasons: state.seasons,
      shows: state.shows,
      state,
    }),
  )

  const [query, setQuery] = useState(initialQuery || '')

  const moviesIndex = useMemo(
    () =>
      buildIndex(moviesSelector(movies), (movie) => buildMovieSearchKey(movie)),
    [movies],
  )
  const showsIndex = useMemo(
    () =>
      buildIndex(showsSelector(shows), (show) =>
        buildShowSearchKey(show, seasonsByShowSelector(show.id)(seasons)),
      ),
    [shows],
  )
  const peopleIndex: Index = useMemo(
    () =>
      buildIndex(
        peopleSelector(people)
          .map((id) => personSelector(id)(state))
          .filter(notUndefined),
        (person) => buildPersonSearchKey(person),
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
  const foundPeople = useMemo(() => {
    const result = peopleIndex.search(query)
    return result
      .map((id) => personSelector(id as string)(state))
      .filter(notUndefined)
  }, [peopleIndex, query])

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

      {foundMovies.length === 0 &&
        foundShows.length === 0 &&
        foundPeople.length === 0 &&
        (query ? (
          <p>{t("We couldn't find anything matching your search.")}</p>
        ) : (
          <p>
            {t('Search for any movie, TV show, person or fictional character.')}
          </p>
        ))}

      {foundMovies.length > 0 && (
        <section>
          <h2>{t('Movies')}</h2>
          <HorizontalSlide items={foundMovies} id="movies" />
        </section>
      )}

      {foundShows.length > 0 && (
        <section>
          <h2>{t('TV shows')}</h2>
          <HorizontalSlide items={foundShows} id="shows" />
        </section>
      )}

      {foundPeople.length > 0 && (
        <section>
          <h2>{t('People')}</h2>
          <HorizontalSlide items={foundPeople} id="people" small />
        </section>
      )}
    </div>
  ) : (
    <Navigate to="/app" />
  )
}
