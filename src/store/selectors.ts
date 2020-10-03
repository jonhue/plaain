import {
  inProgressSelector as inProgressMoviesSelector,
  moviesPersonSelector,
  recentlyWatchedSelector as recentlyWatchedMoviesSelector,
} from './movies/selectors'
import {
  inProgressSelector as inProgressSeasonsSelector,
  recentlyWatchedSelector as recentlyWatchedSeasonsSelector,
  seasonsPersonSelector,
} from './seasons/selectors'
import { MoviesState } from './movies/types'
import { Person } from '../types/items/Person'
import { RootState } from '.'
import { SeasonsState } from './seasons/types'
import { createSelector } from 'reselect'

export const inProgressSelector = createSelector(
  [
    (state: RootState) => inProgressMoviesSelector(state.movies),
    (state: RootState) => inProgressSeasonsSelector(state.seasons),
  ],
  (movies, seasons) => [...movies, ...seasons],
)

export const recentlyWatchedSelector = createSelector(
  [
    (state: RootState) => recentlyWatchedMoviesSelector(state.movies),
    (state: RootState) => recentlyWatchedSeasonsSelector(state.seasons),
  ],
  (movies, seasons) => [...movies, ...seasons],
)

export const personSelector = (id: string) =>
  createSelector<
    { movies: MoviesState; seasons: SeasonsState },
    Person[],
    Person | undefined
  >(
    [
      ({ movies }) => moviesPersonSelector(id, (movie) => movie.cast)(movies),
      ({ movies }) => moviesPersonSelector(id, (movie) => movie.crew)(movies),
      ({ seasons }) =>
        seasonsPersonSelector(id, (season) => season.cast)(seasons),
      ({ seasons }) =>
        seasonsPersonSelector(id, (season) => season.crew)(seasons),
    ],
    (moviesCast, moviesCrew, seasonsCast, seasonsCrew) =>
      [...moviesCast, ...moviesCrew, ...seasonsCast, ...seasonsCrew].reduce(
        (acc, person) => ({
          ...acc,
          jobs: [...new Set([...acc.jobs, ...person.jobs])],
        }),
      ),
  )
