import { createSelector } from 'reselect'

const showsSelector = state => state.shows

export const showSelector = showId => {
  return createSelector(
    showsSelector,
    shows => shows.filter(show => show.id === showId)
  )
}
