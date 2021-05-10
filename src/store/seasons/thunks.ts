import { AppThunk } from '../index'
import { Season } from '../../types/items/Season'
import { Usage } from '../../types/items/Item'
import { showSelector } from '../shows/selectors'
import { updateSeason } from './actions'
import { updateShowProgress } from '../shows/thunks'

export const updateSeasonProgress =
  (season: Season, progress: number): AppThunk<void> =>
  (dispatch, getState) => {
    const usage: Usage = {
      lastWatched: new Date().toISOString(),
      progress,
    }
    dispatch(updateSeason({ ...season, usage }))

    const { shows } = getState()
    const show = showSelector(season.showId)(shows)
    if (show === undefined) throw new Error('parent show of season undefined')

    dispatch(updateShowProgress(show, season.number))
  }
