import { createSelector } from 'reselect'

const showsSelector = (state) => state.shows

export const showSelector = (id) => {
  return createSelector(showsSelector, (shows) => shows[id])
}
