import { createSelector } from 'reselect'

const seasonsSelector = state => state.seasons

export const seasonSelector = id => {
  return createSelector(
    seasonsSelector,
    seasons => seasons[id]
  )
}

export const seasonsByShowSelector = showId => {
  return createSelector(
    seasonsSelector,
    seasons => Object.values(seasons).filter(season => season.showId === showId)
  )
}

export const seasonsByPersonSelector = id => {
  return createSelector(
    seasonsSelector,
    seasons => {
      return Object.values(seasons).filter(season => {
        return season.cast.find(castMember => castMember.id === id) ||
          season.crew.find(crewMember => crewMember.id === id)
      })
    }
  )
}

export const seasonsCastMemberSelector = id => {
  return createSelector(
    seasonsSelector,
    seasons => {
      return Object.values(seasons).map(season => season.cast).flat()
        .filter(castMember => castMember.id === id)
    }
  )
}

export const seasonsCrewMemberSelector = id => {
  return createSelector(
    seasonsSelector,
    seasons => {
      return Object.values(seasons).map(season => season.crew).flat()
        .filter(crewMember => crewMember.id === id)
    }
  )
}
