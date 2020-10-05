import { AppThunk } from '../index'
import { Movie } from '../../types/items/Movie'
import { Usage } from '../../types/items/Item'
import { updateMovie } from './actions'

export const updateMovieProgress = (
  movie: Movie,
  progress: number,
) => (): AppThunk<void> => (dispatch) => {
  const usage: Usage = {
    lastWatched: new Date(),
    progress,
  }
  dispatch(updateMovie({ ...movie, usage }))
}
