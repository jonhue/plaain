import { AppThunk } from '../index'
import { Show } from '../../types/items/Show'
import { Usage } from '../../types/items/Item'
import { updateShow } from './actions'

export const updateShowProgress =
  (show: Show, progress: number): AppThunk<void> =>
  (dispatch) => {
    const usage: Usage = {
      lastWatched: new Date().toISOString(),
      progress,
    }
    dispatch(updateShow({ ...show, usage }))
  }
