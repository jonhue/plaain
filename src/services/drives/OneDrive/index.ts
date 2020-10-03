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
  accessToken: string,
  file: File,
): Promise<File> => {
  const client = getClient(accessToken)
  const response = await fetchItem(client, file.provider.id)
  const newFile = buildFile(response)

  if (newFile !== undefined) return newFile
  else throw new CannotFindFileError(file)
}

const indexFiles = async (
  client: Client,
  folderId: string,
): Promise<File[]> => {
  const { value: filesResponse } = await fetchItemChildren(client, folderId)

  return filesResponse.map(buildFile).filter(notUndefined)
}

const indexMovies = async (
  client: Client,
  path: string | undefined,
): Promise<MovieIndexResponse[]> => {
  if (path === undefined) return []

  const { value: moviesResponse } = await fetchPathChildren(client, path)

  return Promise.all(
    moviesResponse.map(async (movieResponse) => ({
      name: movieResponse.name,
      files: await indexFiles(client, movieResponse.id),
    })),
  )
}

const indexEpisodes = async (
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
      files: await indexFiles(client, episodeResponse.id),
    })),
  )
}

const indexSeasons = async (
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
      episodes: await indexEpisodes(client, seasonResponse.id),
    })),
  )
}

const indexShows = async (
  client: Client,
  path: string | undefined,
): Promise<ShowIndexResponse[]> => {
  if (path === undefined) return []

  const { value: showsResponse } = await fetchPathChildren(client, path)

  return Promise.all(
    showsResponse.map(async (showResponse) => ({
      name: showResponse.name,
      seasons: await indexSeasons(client, showResponse.id),
    })),
  )
}

export const index = async (
  accessToken: string,
  moviesPath: string | undefined,
  showsPath: string | undefined,
): Promise<IndexResponse> => {
  const client = getClient(accessToken)

  return {
    movies: await indexMovies(client, moviesPath),
    shows: await indexShows(client, showsPath),
  }
}
