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

export const seasonsCastSelector = () => {
  return createSelector(
    seasonsSelector,
    seasons => Object.values(seasons).map(season => season.cast).flat()
  )
}

export const seasonsCrewSelector = () => {
  return createSelector(
    seasonsSelector,
    seasons => Object.values(seasons).map(season => season.crew).flat()
  )
}

export const seasonsCastPersonSelector = id => {
  return createSelector(
    seasonsCastSelector(),
    cast => cast.filter(castMember => castMember.id === id)
  )
}

export const seasonsCrewPersonSelector = id => {
  return createSelector(
    seasonsCrewSelector(),
    crew => crew.filter(crewMember => crewMember.id === id)
  )
}

// export const seasonsCastPersonSelector = id => {
//   return createSelector(
//     seasonsSelector,
//     seasons => {
//       return Object.values(seasons).map(season => season.cast).flat()
//         .filter(castMember => castMember.id === id)
//     }
//   )
// }
//
// export const seasonsCrewPersonSelector = id => {
//   return createSelector(
//     seasonsSelector,
//     seasons => {
//       return Object.values(seasons).map(season => season.crew).flat()
//         .filter(crewMember => crewMember.id === id)
//     }
//   )
// }
