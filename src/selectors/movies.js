import { createSelector } from 'reselect'

const moviesSelector = state => state.movies

export const movieSelector = movieId => {
  return createSelector(
    moviesSelector,
    movies => movies[movieId]
  )
}
