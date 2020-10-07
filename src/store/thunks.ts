import { Episode, EpisodeLike } from '../types/items/Episode'
import { Movie, MovieLike } from '../types/items/Movie'
import { Season, SeasonLike } from '../types/items/Season'
import { Show, ShowLike } from '../types/items/Show'
import { episodeSelector, episodesSelector } from './episodes/selectors'
import {
  fetchEpisodeMetadata as fetchEpisodeMetadataCall,
  fetchMovieMetadata as fetchMovieMetadataCall,
  fetchSeasonMetadata as fetchSeasonMetadataCall,
  fetchShowMetadata as fetchShowMetadataCall,
} from '../services/databases/TMDb'
import { movieSelector, moviesSelector } from './movies/selectors'
import { seasonSelector, seasonsSelector } from './seasons/selectors'
import { showSelector, showsSelector } from './shows/selectors'
import { AppThunk } from '.'
import { File } from '../types/files/File'
import { Provider } from '../types/providers/Provider'
import { auth as authCall } from './auth/thunks'
import { removeFilesByProvider as episodeRemoveFilesByProvider } from './episodes/thunks'
import { index as indexCall } from '../services/indexing'
import { removeFilesByProvider as movieRemoveFilesByProvider } from './movies/thunks'
import { providerSelector } from './auth/selectors'
import { removeProvider as removeProviderAction } from './auth/actions'
import { updateEpisode } from './episodes/actions'
import { updateFile as updateFileCall } from '../services/drives'
import { updateMovie } from './movies/actions'
import { updateSeason } from './seasons/actions'
import { updateShow } from './shows/actions'

export const index = (providers: Provider[]): AppThunk<Promise<void>> => async (
  dispatch,
) => {
  await Promise.all(
    providers.map(async (provider) => {
      const updatedProvider = await dispatch(authCall(provider))

      await indexCall(
        updatedProvider,
        (showId: string, seasonId: string, episode: EpisodeLike) =>
          dispatch(fetchEpisodeMetadata(showId, seasonId, episode)),
        (movie: MovieLike) => dispatch(fetchMovieMetadata(movie)),
        (show: Show, season: SeasonLike) =>
          dispatch(fetchSeasonMetadata(show, season)),
        (show: ShowLike) => dispatch(fetchShowMetadata(show)),
      )
    }),
  )
}

export const updateFile = (file: File): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  const { auth } = getState()
  const provider = providerSelector(file.provider.providerId)(auth)
  if (provider === undefined)
    throw new Error('could not find provider for file')

  const updatedProvider = await dispatch(authCall(provider))

  await updateFileCall(updatedProvider, file)
}

const fetchEpisodeMetadata = (
  showId: string,
  seasonId: string,
  episode: EpisodeLike,
): AppThunk<Promise<Episode>> => async (dispatch, getState) => {
  const { episodes } = getState()

  const newEpisode = await fetchEpisodeMetadataCall(showId, seasonId, episode)
  const oldEpisode = episodeSelector(newEpisode.id)(episodes)
  if (oldEpisode !== undefined) newEpisode.usage = oldEpisode.usage

  dispatch(updateEpisode(newEpisode))
  return newEpisode
}

const fetchMovieMetadata = (
  movie: MovieLike,
): AppThunk<Promise<Movie>> => async (dispatch, getState) => {
  const { movies } = getState()

  const newMovie = await fetchMovieMetadataCall(movie)
  const oldMovie = movieSelector(newMovie.id)(movies)
  if (oldMovie !== undefined) newMovie.usage = oldMovie.usage

  dispatch(updateMovie(newMovie))
  return newMovie
}

const fetchSeasonMetadata = (
  show: Show,
  season: SeasonLike,
): AppThunk<Promise<Season>> => async (dispatch, getState) => {
  const { seasons } = getState()

  const newSeason = await fetchSeasonMetadataCall(show, season)
  const oldSeason = seasonSelector(newSeason.id)(seasons)
  if (oldSeason !== undefined) newSeason.usage = oldSeason.usage

  dispatch(updateSeason(newSeason))
  return newSeason
}

const fetchShowMetadata = (show: ShowLike): AppThunk<Promise<Show>> => async (
  dispatch,
  getState,
) => {
  const { shows } = getState()

  const newShow = await fetchShowMetadataCall(show)
  const oldShow = showSelector(newShow.id)(shows)
  if (oldShow !== undefined) newShow.usage = oldShow.usage

  dispatch(updateShow(newShow))
  return newShow
}

const fetchEpisodesMetadata = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  const { episodes } = getState()

  await Promise.all(
    episodesSelector(episodes).map(async (episode) =>
      dispatch(fetchEpisodeMetadata(episode.showId, episode.seasonId, episode)),
    ),
  )
}

const fetchMoviesMetadata = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  const { movies } = getState()

  await Promise.all(
    moviesSelector(movies).map(async (movie) =>
      dispatch(fetchMovieMetadata(movie)),
    ),
  )
}

const fetchSeasonsMetadata = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  const { seasons, shows } = getState()

  await Promise.all(
    seasonsSelector(seasons).map(async (season) => {
      const show = showSelector(season.showId)(shows)
      if (show === undefined) throw new Error('cannot find show for season')

      return dispatch(fetchSeasonMetadata(show, season))
    }),
  )
}

const fetchShowsMetadata = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  const { shows } = getState()

  await Promise.all(
    showsSelector(shows).map(async (show) => dispatch(fetchShowMetadata(show))),
  )
}

export const fetchAllMetadata = (): AppThunk<Promise<void>> => async (
  dispatch,
) => {
  await dispatch(fetchMoviesMetadata())
  await dispatch(fetchShowsMetadata())
  await dispatch(fetchSeasonsMetadata())
  await dispatch(fetchEpisodesMetadata())
}

export const removeProvider = (id: string): AppThunk<void> => (
  dispatch,
  getState,
) => {
  dispatch(removeProviderAction(id))

  const { episodes, movies } = getState()
  episodesSelector(episodes).forEach((episode) =>
    dispatch(episodeRemoveFilesByProvider(episode, id)),
  )
  moviesSelector(movies).forEach((movie) =>
    dispatch(movieRemoveFilesByProvider(movie, id)),
  )
}
