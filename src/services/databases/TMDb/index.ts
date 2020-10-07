import { Episode, EpisodeLike } from '../../../types/items/Episode'
import { Movie, MovieLike } from '../../../types/items/Movie'
import { Season, SeasonLike } from '../../../types/items/Season'
import { Show, ShowLike } from '../../../types/items/Show'
import { buildEpisode, buildMovie, buildSeason, buildShow } from './util'
import {
  fetchEpisode,
  fetchMovie,
  fetchMovieCredits,
  fetchSeason,
  fetchSeasonCredits,
  fetchShow,
} from './api'

export const fetchEpisodeMetadata = async (
  showId: string,
  seasonId: string,
  episode: EpisodeLike,
): Promise<Episode> => {
  const response = await fetchEpisode(
    episode.showTmdbId,
    episode.seasonNumber,
    episode.number,
  )

  return buildEpisode(showId, seasonId, episode, response)
}

export const fetchMovieMetadata = async (movie: MovieLike): Promise<Movie> => {
  const response = await fetchMovie(movie.tmdbId)
  const creditsResponse = await fetchMovieCredits(movie.tmdbId)

  return buildMovie(movie, response, creditsResponse)
}

export const fetchSeasonMetadata = async (
  show: Show,
  season: SeasonLike,
): Promise<Season> => {
  const response = await fetchSeason(season.showTmdbId, season.number)
  const creditsResponse = await fetchSeasonCredits(
    season.showTmdbId,
    season.number,
  )

  return buildSeason(show, season, response, creditsResponse)
}

export const fetchShowMetadata = async (show: ShowLike): Promise<Show> => {
  const response = await fetchShow(show.tmdbId)

  return buildShow(show, response)
}
