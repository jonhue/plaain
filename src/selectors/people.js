import { createSelector } from 'reselect'

import {
  moviesCastMemberSelector,
  moviesCrewMemberSelector,
} from '../selectors/movies'
import {
  seasonsCastMemberSelector,
  seasonsCrewMemberSelector,
} from '../selectors/seasons'

export const personSelector = (id) => {
  return createSelector(
    moviesCastMemberSelector(id),
    moviesCrewMemberSelector(id),
    seasonsCastMemberSelector(id),
    seasonsCrewMemberSelector(id),
    (moviesCast, moviesCrew, seasonsCast, seasonsCrew) => {
      return [...moviesCast, ...moviesCrew, ...seasonsCast, ...seasonsCrew][0]
    },
  )
}

export const personRolesSelector = (id, gender) => {
  return createSelector(
    moviesCastMemberSelector(id),
    moviesCrewMemberSelector(id),
    seasonsCastMemberSelector(id),
    seasonsCrewMemberSelector(id),
    (moviesCast, moviesCrew, seasonsCast, seasonsCrew) => {
      return [
        ...new Set([
          moviesCast.length > 0 || seasonsCast.length > 0
            ? gender === 1
              ? 'Actress'
              : 'Actor'
            : null,
          ...moviesCrew.map((crewMember) => crewMember.job),
          ...seasonsCrew.map((crewMember) => crewMember.job),
        ]),
      ].filter((role) => role !== null)
    },
  )
}
