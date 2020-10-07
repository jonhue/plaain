import {
  EpisodeIndexResponse,
  IndexResponse,
  MovieIndexResponse,
  SeasonIndexResponse,
  ShowIndexResponse,
} from '../types'
import {
  fetchItem,
  fetchItemChildren,
  fetchPathChildren,
  getClient,
} from './api'
import { CannotFindFileError } from '../../../errors/CannotFindFileError'
import { Client } from '@microsoft/microsoft-graph-client'
import { File } from '../../../types/files/File'
import { buildFile } from './util'
import { notUndefined } from '../../../util'

export const updateFile = async (
  providerId: string,
  accessToken: string,
  file: File,
): Promise<File> => {
  const client = getClient(accessToken)
  const response = await fetchItem(client, file.provider.id)
  const newFile = buildFile(providerId)(response)

  if (newFile !== undefined) return newFile
  else throw new CannotFindFileError(file)
}

const indexFiles = async (
  providerId: string,
  client: Client,
  folderId: string,
): Promise<File[]> => {
  const { value: filesResponse } = await fetchItemChildren(client, folderId)

  return filesResponse.map(buildFile(providerId)).filter(notUndefined)
}

const indexMovies = async (
  providerId: string,
  client: Client,
  path: string | undefined,
): Promise<MovieIndexResponse[]> => {
  if (path === undefined) return []

  const { value: moviesResponse } = await fetchPathChildren(client, path)

  return Promise.all(
    moviesResponse.map(async (movieResponse) => ({
      name: movieResponse.name,
      files: await indexFiles(providerId, client, movieResponse.id),
    })),
  )
}

const indexEpisodes = async (
  providerId: string,
  client: Client,
  seasonFolderId: string,
): Promise<EpisodeIndexResponse[]> => {
  const { value: episodesResponse } = await fetchItemChildren(
    client,
    seasonFolderId,
  )

  const episodes = await Promise.all(
    episodesResponse.map(async (episodeResponse) => {
      const number = Number.parseInt(episodeResponse.name)
      if (isNaN(number)) return

      return {
        number,
        files: await indexFiles(providerId, client, episodeResponse.id),
      }
    }),
  )

  return episodes.filter(notUndefined)
}

const indexSeasons = async (
  providerId: string,
  client: Client,
  showFolderId: string,
): Promise<SeasonIndexResponse[]> => {
  const { value: seasonsResponse } = await fetchItemChildren(
    client,
    showFolderId,
  )

  const seasons = await Promise.all(
    seasonsResponse.map(async (seasonResponse) => {
      const number = Number.parseInt(seasonResponse.name)
      if (isNaN(number)) return

      return {
        number,
        episodes: await indexEpisodes(providerId, client, seasonResponse.id),
      }
    }),
  )

  return seasons.filter(notUndefined)
}

const indexShows = async (
  providerId: string,
  client: Client,
  path: string | undefined,
): Promise<ShowIndexResponse[]> => {
  if (path === undefined) return []

  const { value: showsResponse } = await fetchPathChildren(client, path)

  return Promise.all(
    showsResponse.map(async (showResponse) => ({
      name: showResponse.name,
      seasons: await indexSeasons(providerId, client, showResponse.id),
    })),
  )
}

export const index = async (
  providerId: string,
  accessToken: string,
  moviesPath: string | undefined,
  showsPath: string | undefined,
): Promise<IndexResponse> => {
  const client = getClient(accessToken)

  return {
    movies: await indexMovies(providerId, client, moviesPath),
    shows: await indexShows(providerId, client, showsPath),
  }
}
