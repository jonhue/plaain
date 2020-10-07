import { AccPerson, Person } from '../types/items/Person'
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
import { ItemKind } from '../types/items/Item'
import { MoviesState } from './movies/types'
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
    AccPerson | undefined
  >(
    [
      ({ movies }) => moviesPersonSelector(id, (movie) => movie.cast)(movies),
      ({ movies }) => moviesPersonSelector(id, (movie) => movie.crew)(movies),
      ({ seasons }) =>
        seasonsPersonSelector(id, (season) => season.cast)(seasons),
      ({ seasons }) =>
        seasonsPersonSelector(id, (season) => season.crew)(seasons),
    ],
    (moviesCast, moviesCrew, seasonsCast, seasonsCrew) => {
      const roles = [
        ...moviesCast,
        ...moviesCrew,
        ...seasonsCast,
        ...seasonsCrew,
      ]

      return roles.reduce<AccPerson | undefined>(
        (acc, person) => ({
          kind: ItemKind.Person,
          id,
          tmdbId: person.tmdbId,
          name: person.name,
          gender: person.gender,
          profilePath: person.profilePath,
          jobs:
            acc !== undefined
              ? [...new Set([...acc.jobs, person.job])]
              : [person.job],
        }),
        undefined,
      )
    },
  )
