import { createSelector } from 'reselect'

const seasonsSelector = state => state.seasons

export const seasonSelector = id => {
  return createSelector(
    seasonsSelector,
    seasons => seasons[id]
  )
}

export const seasonsByPersonSelector = id => {
  return createSelector(
    seasonsSelector,
    seasons => {
      return Object.values(seasons).filter(season => {
        return season.cast.filter(castMember => castMember.id === id).length > 0
          || season.crew.filter(crewMember => crewMember.id === id).length > 0
      })
    }
  )
}

export const seasonsCastSelector = id => {
  return createSelector(
    seasonsSelector,
    seasons => {
      return Object.values(seasons).map(season => season.cast).flat()
        .filter(castMember => castMember.id === id)
    }
  )
}

export const seasonsCrewSelector = id => {
  return createSelector(
    seasonsSelector,
    seasons => {
      return Object.values(seasons).map(season => season.crew).flat()
        .filter(crewMember => crewMember.id === id)
    }
  )
}
