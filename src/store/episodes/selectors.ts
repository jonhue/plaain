import { EpisodesState } from './types'
import { createSelector } from 'reselect'

const episodesSelector = (state: EpisodesState) =>
  Object.keys(state).map((id) => state[id]!)

export const episodesBySeasonSelector = (seasonId: string) =>
  createSelector(episodesSelector, (episodes) =>
    episodes.filter((episode) => episode.seasonId === seasonId),
  )

// export const inProgressSelector = (state: EpisodesState) =>
//   episodesSelector(state).filter((episode) => episode.progress !== undefined)
