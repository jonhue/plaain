import { createSelector } from 'reselect'

const seasonsSelector = state => state.seasons

export const seasonSelector = id => {
  return createSelector(
    seasonsSelector,
    seasons => seasons[id]
  )
}
