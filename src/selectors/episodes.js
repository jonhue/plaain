import { createSelector } from 'reselect'

const episodesSelector = state => state.episodes

export const episodeSelector = id => {
  return createSelector(
    episodesSelector,
    episodes => episodes[id]
  )
}

export const episodesBySeasonSelector = seasonId => {
  return createSelector(
    episodesSelector,
    episodes => Object.values(episodes).filter(episode => episode.seasonId === seasonId)
  )
}
