import { createSelector } from 'reselect'

import { moviesCastSelector, moviesCrewSelector, moviesCastPersonSelector, moviesCrewPersonSelector } from '../selectors/movies'
import { seasonsCastSelector, seasonsCrewSelector, seasonsCastPersonSelector, seasonsCrewPersonSelector } from '../selectors/seasons'

export const peopleSelector = () => {
  return createSelector(
    moviesCastSelector(),
    moviesCrewSelector(),
    seasonsCastSelector(),
    seasonsCrewSelector(),
    (moviesCast, moviesCrew, seasonsCast, seasonsCrew) => {
      return [
        ...new Set([
          ...moviesCast,
          ...moviesCrew,
          ...seasonsCast,
          ...seasonsCrew
        ])
      ]
    }
  )
}

export const personSelector = id => {
  return createSelector(
    moviesCastPersonSelector(id),
    moviesCrewPersonSelector(id),
    seasonsCastPersonSelector(id),
    seasonsCrewPersonSelector(id),
    (moviesCast, moviesCrew, seasonsCast, seasonsCrew) => {
      return [...moviesCast, ...moviesCrew, ...seasonsCast, ...seasonsCrew][0]
    }
  )
}

export const personRolesSelector = id => {
  return createSelector(
    moviesCastPersonSelector(id),
    moviesCrewPersonSelector(id),
    seasonsCastPersonSelector(id),
    seasonsCrewPersonSelector(id),
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
