import { AppThunk } from '../index'
import { Episode } from '../../types/items/Episode'
import { Usage } from '../../types/items/Item'
import { seasonSelector } from '../seasons/selectors'
import { updateEpisode } from './actions'
import { updateSeasonProgress } from '../seasons/thunks'

export const updateEpisodeProgress = (
  episode: Episode,
  progress: number,
) => (): AppThunk<void> => (dispatch, getState) => {
  const usage: Usage = {
    lastWatched: new Date(),
    progress,
  }
  dispatch(updateEpisode({ ...episode, usage }))

  const { seasons } = getState()
  const season = seasonSelector(episode.seasonId)(seasons)
  if (season === undefined)
    throw new Error('parent season of episode undefined')

  dispatch(updateSeasonProgress(season, episode.number))
}
