import { createSelector } from 'reselect'

const episodesSelector = state => state.episodes

export const episodeSelector = id => {
  return createSelector(
    episodesSelector,
    episodes => episodes[id]
  )
}
