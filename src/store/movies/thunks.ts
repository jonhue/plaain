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

export const removeFilesByProvider = (
  movie: Movie,
  providerId: string,
) => (): AppThunk<void> => (dispatch) => {
  dispatch(
    updateMovie({
      ...movie,
      sources: movie.sources.filter(
        (source) => source.provider.providerId !== providerId,
      ),
      captions: movie.captions.filter(
        (caption) => caption.provider.providerId !== providerId,
      ),
    }),
  )
}
