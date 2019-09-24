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
