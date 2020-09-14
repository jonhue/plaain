import { get } from '../http'

const BASE_URL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN!
const PARAMS = {
  language: 'en-US',
}

interface PersonResponse {
  gender: number | undefined
  id: number
  name: string
  profile_path: string | undefined
}

interface CastResponse extends PersonResponse {
  character: string
}

interface CrewResponse extends PersonResponse {
  department: string
  job: string
}

interface GenreResponse {
  id: number
  name: string
}

interface MovieCreditsResponse {
  cast: CastResponse[]
  crew: CrewResponse[]
  id: number
}

interface MovieDetailsResponse {
  adult: boolean
  backdrop_path: string | undefined
  budget: number
  genres: GenreResponse[]
  homepage: string | undefined
  id: number
  imdb_id: string | undefined
  overview: string | undefined
  popularity: number
  poster_path: string | undefined
  release_date: string
  revenue: number
  runtime: number | undefined
  tagline: string | undefined
  title: string
  vote_average: number
  vote_count: number
}

interface MovieResponse {
  id: number
}

interface SearchMoviesResponse {
  results: MovieResponse[]
}

interface SearchTVShowsResponse {
  results: TVShowResponse[]
}

interface SearchMoviesResponse {
  results: MovieResponse[]
}

interface SearchTVShowsResponse {
  results: TVShowResponse[]
}

interface TVEpisodeResponse {
  air_date: string
  crew: CrewResponse[]
  episode_number: number
  guest_stars: CastResponse[]
  name: string
  overview: string
  id: number
  season_number: number
  still_path: string | undefined
  vote_average: number
  vote_count: number
}

interface TVSeasonCreditsResponse {
  cast: CastResponse[]
  crew: CrewResponse[]
  id: number
}

interface TVSeasonDetailsResponse {
  air_date: string
  episodes: TVEpisodeResponse[]
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

interface TVSeasonResponse {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

interface TVShowDetailsResponse {
  backdrop_path: string | undefined
  created_by: PersonResponse[]
  episode_run_time: number[]
  first_air_date: string
  genres: GenreResponse[]
  homepage: string | undefined
  id: number
  last_air_date: string
  name: string
  number_of_episodes: number
  number_of_seasons: number
  overview: string
  popularity: number
  seasons: TVSeasonResponse[]
  vote_average: number
  vote_count: number
}

interface TVShowResponse {
  id: number
}

export const findMovie = async (query: string) => {
  const { results } = await get<SearchMoviesResponse>(
    BASE_URL,
    'search/movie',
    ACCESS_TOKEN,
    { ...PARAMS, query },
  )

  if (results.length === 0) return undefined
  else return results[0].id
}

export const findShow = async (query: string) => {
  const { results } = await get<SearchTVShowsResponse>(
    BASE_URL,
    'search/tv',
    ACCESS_TOKEN,
    { ...PARAMS, query },
  )

  if (results.length === 0) return undefined
  else return results[0].id
}

export const fetchMove = (id: number) =>
  get<MovieDetailsResponse>(BASE_URL, `movie/${id}`, ACCESS_TOKEN, PARAMS)

export const fetchMovieCredits = (id: number) =>
  get<MovieCreditsResponse>(
    BASE_URL,
    `movie/${id}/credits`,
    ACCESS_TOKEN,
    PARAMS,
  )

export const fetchShow = (id: number) =>
  get<TVShowDetailsResponse>(BASE_URL, `tv/${id}`, ACCESS_TOKEN, PARAMS)

export const fetchSeason = (showId: number, seasonNumber: number) =>
  get<TVSeasonDetailsResponse>(
    BASE_URL,
    `tv/${showId}/season/${seasonNumber}`,
    ACCESS_TOKEN,
    PARAMS,
  )

export const fetchSeasonCredits = (showId: number, seasonNumber: number) =>
  get<TVSeasonCreditsResponse>(
    BASE_URL,
    `tv/${showId}/season/${seasonNumber}/credits`,
    ACCESS_TOKEN,
    PARAMS,
  )
