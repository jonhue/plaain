import { createSelector } from 'reselect'

const moviesSelector = state => state.movies

export const movieSelector = id => {
  return createSelector(
    moviesSelector,
    movies => movies[id]
  )
}

export const inProgressMoviesSelector = () => {
  return createSelector(
    moviesSelector,
    movies => {
      return Object.values(movies).filter(movie => {
        return movie.progress !== 0 &&
          movie.progress / 60 < movie.runtime * 0.95
      }).sort((a, b) => (a.lastWatched > b.lastWatched) ? -1 : 1)
    }
  )
}

export const recentlyWatchedMoviesSelector = date => {
  return createSelector(
    moviesSelector,
    movies => {
      return Object.values(movies).filter(movie => {
        return movie.lastWatched >= date.getTime() &&
          movie.progress / 60 >= movie.runtime * 0.95
      }).sort((a, b) => (a.lastWatched > b.lastWatched) ? -1 : 1)
    }
  )
}

export const moviesByPersonSelector = id => {
  return createSelector(
    moviesSelector,
    movies => {
      return Object.values(movies).filter(movie => {
        return movie.cast.find(castMember => castMember.id === id) ||
          movie.crew.find(crewMember => crewMember.id === id)
      })
    }
  )
}

export const moviesCastSelector = () => {
  return createSelector(
    moviesSelector,
    movies => Object.values(movies).map(movie => movie.cast).flat()
  )
}

export const moviesCrewSelector = () => {
  return createSelector(
    moviesSelector,
    movies => Object.values(movies).map(movie => movie.crew).flat()
  )
}

export const moviesCastPersonSelector = id => {
  return createSelector(
    moviesCastSelector(),
    cast => cast.filter(castMember => castMember.id === id)
  )
}

export const moviesCrewPersonSelector = id => {
  return createSelector(
    moviesCrewSelector(),
    crew => crew.filter(crewMember => crewMember.id === id)
  )
}

// export const moviesCastPersonSelector = id => {
//   return createSelector(
//     moviesSelector,
//     movies => {
//       return Object.values(movies).map(movie => movie.cast).flat()
//         .filter(castMember => castMember.id === id)
//     }
//   )
// }
//
// export const moviesCrewPersonSelector = id => {
//   return createSelector(
//     moviesSelector,
//     movies => {
//       return Object.values(movies).map(movie => movie.crew).flat()
//         .filter(crewMember => crewMember.id === id)
//     }
//   )
// }
