import { Item, ItemKind, ItemLike } from '../../../types/items/Item'
import { buildEpisode, buildMovie, buildSeason, buildShow } from './util'
import {
  fetchEpisode,
  fetchMovie,
  fetchMovieCredits,
  fetchSeason,
  fetchSeasonCredits,
  fetchShow,
} from './api'
import { Episode, EpisodeLike } from '../../../types/items/Episode'
import { Movie, MovieLike } from '../../../types/items/Movie'
import { Season, SeasonLike } from '../../../types/items/Season'
import { Show, ShowLike } from '../../../types/items/Show'

const fetchEpisodeMetadata = async (episode: EpisodeLike): Promise<Episode> => {
  const response = await fetchEpisode(
    episode.showTmdbId,
    episode.seasonNumber,
    episode.number,
  )

  return buildEpisode(episode, response)
}

const fetchMovieMetadata = async (movie: MovieLike): Promise<Movie> => {
  const response = await fetchMovie(movie.tmdbId)
  const creditsResponse = await fetchMovieCredits(movie.tmdbId)

  return buildMovie(movie, response, creditsResponse)
}

const fetchSeasonMetadata = async (season: SeasonLike): Promise<Season> => {
  const response = await fetchSeason(season.showTmdbId, season.number)
  const creditsResponse = await fetchSeasonCredits(
    season.showTmdbId,
    season.number,
  )

  return buildSeason(season, response, creditsResponse)
}

const fetchShowMetadata = async (show: ShowLike): Promise<Show> => {
  const response = await fetchShow(show.tmdbId)

  return buildShow(show, response)
}

export const fetchMetadata = async (item: ItemLike): Promise<Item> => {
  switch (item.kind) {
    case ItemKind.Episode:
      return fetchEpisodeMetadata(item)
    case ItemKind.Movie:
      return fetchMovieMetadata(item)
    case ItemKind.Person:
      return item
    case ItemKind.Season:
      return fetchSeasonMetadata(item)
    case ItemKind.Show:
      return fetchShowMetadata(item)
  }
}
