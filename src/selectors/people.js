import { createSelector } from 'reselect'

import { moviesCastSelector, moviesCrewSelector } from '../selectors/movies'
import { seasonsCastSelector, seasonsCrewSelector } from '../selectors/seasons'

export const personSelector = id => {
  return createSelector(
    moviesCastSelector(id),
    moviesCrewSelector(id),
    seasonsCastSelector(id),
    seasonsCrewSelector(id),
    (moviesCast, moviesCrew, seasonsCast, seasonsCrew) => {
      return [...moviesCast, ...moviesCrew, ...seasonsCast, ...seasonsCrew][0]
    }
  )
}

export const personRolesSelector = id => {
  return createSelector(
    moviesCastSelector(id),
    moviesCrewSelector(id),
    seasonsCastSelector(id),
    seasonsCrewSelector(id),
    (moviesCast, moviesCrew, seasonsCast, seasonsCrew) => {
      return [
        ...new Set([
          (moviesCast.length > 0 || seasonsCast.length > 0) && 'Acting',
          ...moviesCrew.map(crewMember => crewMember.job),
          ...seasonsCrew.map(crewMember => crewMember.job)
        ])
      ]
    }
  )
}
