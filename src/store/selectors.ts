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
import { AccPerson } from '../types/items/Person'
import { ItemKind } from '../types/items/Item'
import { RootState } from '.'
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
  createSelector(
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

      const characters = moviesCast
        .concat(seasonsCast)
        .map((person) => person.character)

      return roles.reduce<AccPerson | undefined>(
        (acc, person) => ({
          kind: ItemKind.Person,
          id,
          tmdbId: person.tmdbId,
          title: person.title,
          gender: person.gender,
          posterPath: person.posterPath,
          characters,
          jobs:
            person.job === undefined
              ? acc?.jobs
              : acc !== undefined && acc.jobs !== undefined
                ? [...new Set([...acc.jobs, person.job])]
                : [person.job],
        }),
        undefined,
      )
    },
  )
