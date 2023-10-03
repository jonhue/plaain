import { Episode, EpisodeLike } from '../types/items/Episode'
import {
  EpisodeIndexResponse,
  IndexResponse,
  MovieIndexResponse,
  SeasonIndexResponse,
  ShowIndexResponse,
} from './drives/types'
import { Movie, MovieLike } from '../types/items/Movie'
import { Provider, ProviderKind } from '../types/providers/Provider'
import { Season, SeasonLike } from '../types/items/Season'
import { Show, ShowLike } from '../types/items/Show'
import {
  buildEpisodeIndexResponse,
  buildSeasonIndexResponse,
} from './drives/util'
import {
  buildEpisodeLike,
  buildMovieLike,
  buildSeasonLike,
  buildShowLike,
} from './drives'
import { findMovie, findShow } from './databases/TMDb/api'
import { index as ftpIndex } from '../services/drives/FTP'
import { index as oneDriveIndex } from '../services/drives/OneDrive'

const handleProvider = (provider: Provider): Promise<IndexResponse> => {
  switch (provider.kind) {
    case ProviderKind.FTP:
      return ftpIndex(provider)
    case ProviderKind.OneDrive:
      return oneDriveIndex(provider)
  }
}

const indexMovies = (
  moviesResponse: MovieIndexResponse[],
  fetchMovieMetadata: (movie: MovieLike) => Promise<Movie>,
) =>
  Promise.all(
    moviesResponse.map(async (movieResponse) => {
      const tmdbId = await findMovie(movieResponse.name)
      if (tmdbId === undefined) return

      const movieAlike = buildMovieLike(tmdbId)(movieResponse)
      await fetchMovieMetadata(movieAlike)
    }),
  )

const indexShows = (
  showsResponse: ShowIndexResponse[],
  fetchEpisodeMetadata: (
    showId: string,
    seasonId: string,
    episode: EpisodeLike,
  ) => Promise<Episode>,
  fetchSeasonMetadata: (show: Show, season: SeasonLike) => Promise<Season>,
  fetchShowMetadata: (show: ShowLike) => Promise<Show>,
) =>
  Promise.all(
    showsResponse.map(async (showResponse) => {
      const tmdbId = await findShow(showResponse.name)
      if (tmdbId === undefined) return

      const showAlike = buildShowLike(tmdbId)()
      const show = await fetchShowMetadata(showAlike)
      await indexSeasons(
        show.seasons.map((number) =>
          buildSeasonIndexResponse(
            number,
            showResponse.seasons.find((season) => season.number === number)
              ?.episodes,
          ),
        ),
        show,
        fetchEpisodeMetadata,
        fetchSeasonMetadata,
      )
    }),
  )

const indexSeasons = (
  seasonsResponse: SeasonIndexResponse[],
  show: Show,
  fetchEpisodeMetadata: (
    showId: string,
    seasonId: string,
    episode: EpisodeLike,
  ) => Promise<Episode>,
  fetchSeasonMetadata: (show: Show, season: SeasonLike) => Promise<Season>,
) =>
  Promise.all(
    seasonsResponse.map(async (seasonResponse) => {
      const seasonAlike = buildSeasonLike(show.tmdbId)(seasonResponse)
      const season = await fetchSeasonMetadata(show, seasonAlike)
      await indexEpisodes(
        season.episodes.map((number) =>
          buildEpisodeIndexResponse(
            number,
            seasonResponse.episodes.find((episode) => episode.number === number)
              ?.files,
          ),
        ),
        show,
        season,
        fetchEpisodeMetadata,
      )
    }),
  )

const indexEpisodes = (
  episodesResponse: EpisodeIndexResponse[],
  show: Show,
  season: Season,
  fetchEpisodeMetadata: (
    showId: string,
    seasonId: string,
    episode: EpisodeLike,
  ) => Promise<Episode>,
) =>
  Promise.all(
    episodesResponse.map(async (episodeResponse) => {
      const episodeAlike = buildEpisodeLike(
        show.tmdbId,
        season.number,
      )(episodeResponse)
      await fetchEpisodeMetadata(show.id, season.id, episodeAlike)
    }),
  )

export const index = async (
  provider: Provider,
  fetchEpisodeMetadata: (
    showId: string,
    seasonId: string,
    episode: EpisodeLike,
  ) => Promise<Episode>,
  fetchMovieMetadata: (movie: MovieLike) => Promise<Movie>,
  fetchSeasonMetadata: (show: Show, season: SeasonLike) => Promise<Season>,
  fetchShowMetadata: (show: ShowLike) => Promise<Show>,
) => {
  const { movies: moviesResponse, shows: showsResponse } =
    await handleProvider(provider)

  await indexMovies(moviesResponse, fetchMovieMetadata)
  await indexShows(
    showsResponse,
    fetchEpisodeMetadata,
    fetchSeasonMetadata,
    fetchShowMetadata,
  )
}
