import { createSelector } from 'reselect'

const moviesSelector = state => state.movies

export const movieSelector = id => {
  return createSelector(
    moviesSelector,
    movies => movies[id]
  )
}
