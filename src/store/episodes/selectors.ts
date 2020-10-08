import { EpisodesState } from './types'
import { createSelector } from 'reselect'

export const episodeSelector = (id: string) => (state: EpisodesState) =>
  state[id]

export const episodesSelector = (state: EpisodesState) =>
  Object.keys(state).map((id) => state[id]!)

export const episodesBySeasonSelector = (seasonId: string) =>
  createSelector(episodesSelector, (episodes) =>
    episodes.filter((episode) => episode.seasonId === seasonId),
  )
