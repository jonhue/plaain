import { get } from '../http'

const BASE_URL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_API_READ_ACCESS_TOKEN!
const PARAMS = {
  language: 'en-US',
}

interface CastResponse {
  character: string
  gender: number | undefined
  name: string
}

interface CrewResponse {
  department: string
  gender: number | undefined
  job: string
  name: string
}

interface GenreResponse {
  id: number
  name: string
}

interface MovieCreditsResponse {
  id: number
  cast: CastResponse[]
  crew: CrewResponse[]
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
