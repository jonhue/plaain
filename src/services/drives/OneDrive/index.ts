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

  return Promise.all(
    episodesResponse.map(async (episodeResponse) => ({
      name: episodeResponse.name,
      files: await indexFiles(providerId, client, episodeResponse.id),
    })),
  )
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

  return Promise.all(
    seasonsResponse.map(async (seasonResponse) => ({
      name: seasonResponse.name,
      episodes: await indexEpisodes(providerId, client, seasonResponse.id),
    })),
  )
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
