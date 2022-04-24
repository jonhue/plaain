import {
  CastMember,
  CrewMember,
  Gender,
  Job,
} from '../../../types/items/Person'
import {
  CastResponse,
  CrewResponse,
  MovieCreditsResponse,
  MovieDetailsResponse,
  TVEpisodeResponse,
  TVSeasonCreditsResponse,
  TVSeasonDetailsResponse,
  TVShowDetailsResponse,
} from './types'
import { Episode, EpisodeLike } from '../../../types/items/Episode'
import { Movie, MovieLike } from '../../../types/items/Movie'
import { Season, SeasonLike } from '../../../types/items/Season'
import { Show, ShowLike } from '../../../types/items/Show'
import { buildItemId, buildTrailerUrl } from '../util'
import { notUndefined, parseDateToISOString } from '../../../util'
import { ItemKind } from '../../../types/items/Item'

// https://developers.themoviedb.org/3/getting-started/images
export const buildTMDbImageUrl = (path: string, size = 'original') =>
  `https://image.tmdb.org/t/p/${size}${path}`

export const buildEpisode = (
  showId: string,
  seasonId: string,
  { seasonNumber, showTmdbId, sources, captions, usage }: EpisodeLike,
  {
    air_date: airDate,
    crew,
    episode_number: number,
    guest_stars: guestStars,
    name: title,
    overview: summary,
    id: tmdbId,
    still_path: stillPath,
  }: TVEpisodeResponse,
): Episode => ({
  kind: ItemKind.Episode,
  id: buildItemId(tmdbId),
  tmdbId,
  number,
  title,
  seasonId,
  seasonNumber,
  showId,
  showTmdbId,
  summary,
  airDate: parseDateToISOString(airDate),
  stillPath,
  guestStars: guestStars.map(buildCastMember),
  crew: crew.map(buildCrewMember).filter(notUndefined),
  sources,
  captions,
  usage,
})

export const buildMovie = (
  { sources, captions, usage }: MovieLike,
  {
    adult: isAdult,
    backdrop_path: backdropPath,
    budget,
    homepage,
    id: tmdbId,
    overview: summary,
    poster_path: posterPath,
    release_date: releaseDate,
    revenue,
    runtime: duration,
    title,
  }: MovieDetailsResponse,
  { cast, crew }: MovieCreditsResponse,
): Movie => ({
  kind: ItemKind.Movie,
  id: buildItemId(tmdbId),
  tmdbId,
  title,
  summary,
  duration,
  releaseDate: parseDateToISOString(releaseDate),
  isAdult,
  budget,
  revenue,
  homepage,
  posterPath,
  backdropPath,
  trailerUrl: buildTrailerUrl(title),
  cast: cast.map(buildCastMember),
  crew: crew.map(buildCrewMember).filter(notUndefined),
  sources,
  captions,
  usage,
})

const buildGender = (gender: number | undefined): Gender => {
  switch (gender) {
    case 0:
      return Gender.Unknown
    case 1:
      return Gender.Female
    case 2:
      return Gender.Male
    default:
      return Gender.Unknown
  }
}

const buildJob = (job?: string): Job | undefined => {
  if (job === undefined) return Job.Acting

  if (Object.values(Job).includes(job as Job)) return job as Job
}

export const buildCastMember = ({
  character,
  gender: rawGender,
  id: tmdbId,
  name: title,
  profile_path: posterPath,
}: CastResponse): CastMember => {
  const gender = buildGender(rawGender)
  const job = buildJob()

  return {
    kind: ItemKind.Person,
    id: buildItemId(tmdbId),
    tmdbId,
    title,
    gender,
    posterPath,
    job,
    character,
  }
}

export const buildCrewMember = ({
  department,
  gender: rawGender,
  id: tmdbId,
  job: rawJob,
  name: title,
  profile_path: posterPath,
}: CrewResponse): CrewMember | undefined => {
  const gender = buildGender(rawGender)
  const job = buildJob(rawJob)
  if (job === undefined) return

  return {
    kind: ItemKind.Person,
    id: buildItemId(tmdbId),
    tmdbId,
    title,
    gender,
    posterPath,
    job,
    department,
  }
}

export const buildSeason = (
  { id: showId, title: showTitle, backdropPath: showBackdropPath }: Show,
  { showTmdbId, usage }: SeasonLike,
  {
    air_date: airDate,
    id: tmdbId,
    name: title,
    overview: summary,
    poster_path: posterPath,
    season_number: number,
    episodes,
  }: TVSeasonDetailsResponse,
  { cast, crew }: TVSeasonCreditsResponse,
): Season => ({
  kind: ItemKind.Season,
  id: buildItemId(tmdbId),
  tmdbId,
  number,
  title,
  showId,
  showTmdbId,
  showTitle,
  showBackdropPath,
  summary,
  airDate: parseDateToISOString(airDate),
  posterPath,
  trailerUrl: buildTrailerUrl(`${showTitle} season ${number}`),
  episodes: episodes.map((episode) => episode.episode_number),
  cast: cast.map(buildCastMember),
  crew: crew.map(buildCrewMember).filter(notUndefined),
  usage,
})

export const buildShow = (
  { usage }: ShowLike,
  {
    backdrop_path: backdropPath,
    episode_run_time: episodeRunTime,
    first_air_date: firstAirDate,
    homepage,
    id: tmdbId,
    last_air_date: lastAirDate,
    name: title,
    overview: summary,
    poster_path: posterPath,
    seasons,
  }: TVShowDetailsResponse,
): Show => ({
  kind: ItemKind.Show,
  id: buildItemId(tmdbId),
  tmdbId,
  title,
  summary,
  episodeRunTime,
  firstAirDate: parseDateToISOString(firstAirDate),
  lastAirDate: parseDateToISOString(lastAirDate),
  homepage,
  posterPath,
  backdropPath,
  usage,
  seasons: seasons.map((season) => season.season_number),
})
