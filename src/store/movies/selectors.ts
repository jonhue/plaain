import { isInProgress, wasRecentlyWatched } from '../../util'
import { Movie } from '../../types/items/Movie'
import { MoviesState } from './types'
import { Person } from '../../types/items/Person'
import { RECENTLY_WATCHED_THRESHOLD } from '../../constants'
import { createSelector } from 'reselect'

export const movieSelector = (id: string) => (state: MoviesState) => state[id]

export const moviesSelector = (state: MoviesState) =>
  Object.keys(state).map((id) => state[id]!)

export const inProgressSelector = (state: MoviesState) =>
  moviesSelector(state).filter(isInProgress)

export const recentlyWatchedSelector = (state: MoviesState) =>
  moviesSelector(state).filter((movie) =>
    wasRecentlyWatched(movie, RECENTLY_WATCHED_THRESHOLD),
  )

export const moviesByPersonSelector = (id: string) =>
  createSelector(moviesSelector, (movies) =>
    movies.filter(
      (movie) =>
        movie.cast.find((person) => person.id === id) ||
        movie.crew.find((person) => person.id === id),
    ),
  )

export const moviesPersonSelector = <T extends Person>(
  id: string,
  fn: (movie: Movie) => T[],
) =>
  createSelector(moviesSelector, (movies) =>
    movies
      .map(fn)
      .reduce((acc, people) => acc.concat(people), [])
      .filter((person) => person.id === id),
  )
