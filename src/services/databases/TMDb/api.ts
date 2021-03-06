import {
  MovieCreditsResponse,
  MovieDetailsResponse,
  SearchMoviesResponse,
  SearchTVShowsResponse,
  TVEpisodeResponse,
  TVSeasonCreditsResponse,
  TVSeasonDetailsResponse,
  TVShowDetailsResponse,
} from './types'
import { get } from '../../http'
import i18next from 'i18next'

const BASE_URL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN!

export const findMovie = async (query: string) => {
  const { results } = await get<SearchMoviesResponse>(
    BASE_URL,
    'search/movie',
    ACCESS_TOKEN,
    { language: i18next.language, query },
  )

  if (results.length === 0) return undefined
  else return results[0].id
}

export const findShow = async (query: string) => {
  const { results } = await get<SearchTVShowsResponse>(
    BASE_URL,
    'search/tv',
    ACCESS_TOKEN,
    { language: i18next.language, query },
  )

  if (results.length === 0) return undefined
  else return results[0].id
}

export const fetchMovie = (id: number) =>
  get<MovieDetailsResponse>(BASE_URL, `movie/${id}`, ACCESS_TOKEN, {
    language: i18next.language,
  })

export const fetchMovieCredits = (id: number) =>
  get<MovieCreditsResponse>(BASE_URL, `movie/${id}/credits`, ACCESS_TOKEN, {
    language: i18next.language,
  })

export const fetchShow = (id: number) =>
  get<TVShowDetailsResponse>(BASE_URL, `tv/${id}`, ACCESS_TOKEN, {
    language: i18next.language,
  })

export const fetchSeason = (showId: number, seasonNumber: number) =>
  get<TVSeasonDetailsResponse>(
    BASE_URL,
    `tv/${showId}/season/${seasonNumber}`,
    ACCESS_TOKEN,
    { language: i18next.language },
  )

export const fetchSeasonCredits = (showId: number, seasonNumber: number) =>
  get<TVSeasonCreditsResponse>(
    BASE_URL,
    `tv/${showId}/season/${seasonNumber}/credits`,
    ACCESS_TOKEN,
    { language: i18next.language },
  )

export const fetchEpisode = (
  showId: number,
  seasonNumber: number,
  episodeNumber: number,
) =>
  get<TVEpisodeResponse>(
    BASE_URL,
    `tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}`,
    ACCESS_TOKEN,
    { language: i18next.language },
  )
