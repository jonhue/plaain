import { MOVIES_PATH, SHOWS_PATH } from '../../constants'
import { Client } from '@microsoft/microsoft-graph-client'
import { OneDriveFile } from '../../types/files/providers/OneDriveFile'
import { ProviderKind } from '../../types/providers/Provider'
import { parseFileName } from './util'
import {
  EpisodeIndexResponse,
  IndexResponse,
  MovieIndexResponse,
  SeasonIndexResponse,
  ShowIndexResponse,
} from './types'
import {notUndefined} from '../../util'
import { CannotFindFileError } from '../../errors/CannotFindFileError'

interface DriveItemChildrenResponse {
  value: DriveItemResponse[]
}

interface DriveItemResponse {
  createdDateTime: string
  id: string
  lastModifiedDateTime: string
  name: string
  size: number
  webUrl: string
  folder: FolderResponse | undefined
  file: FileResponse | undefined
  video: VideoResponse | undefined
  ['@microsoft.graph.downloadUrl']: string
}

interface FileResponse {
  mimeType: string
}

interface FolderResponse {
  childCount: number
}

interface VideoResponse {
  bitrate: number
  duration: number
  height: number
  width: number
  audioChannels: number
  audioFormat: string
  fourCC: string
  frameRate: number
}

const getClient = (accessToken: string) =>
  Client.init({
    authProvider: (done) => done(null, accessToken),
  })

const fetchPathChildren = (
  client: Client,
  path: string,
): Promise<DriveItemChildrenResponse> =>
  client.api(`/me/drive/root:${path}:/children`).get()

const fetchItem = (
  client: Client,
  itemId: string,
): Promise<DriveItemResponse> => client.api(`/me/drive/items/${itemId}`).get()

const fetchItemChildren = (
  client: Client,
  itemId: string,
): Promise<DriveItemChildrenResponse> =>
  client.api(`/me/drive/items/${itemId}/children`).get()

const fetchMovies = (client: Client, path: string) =>
  fetchPathChildren(client, `${path}${MOVIES_PATH}`)

const fetchShows = (client: Client, path: string) =>
  fetchPathChildren(client, `${path}${SHOWS_PATH}`)

const buildFile = ({
  id,
  name: fileName,
  size,
  webUrl,
  file,
  video,
  ['@microsoft.graph.downloadUrl']: downloadUrl,
}: DriveItemResponse): OneDriveFile | undefined => {
  if (file === undefined) return

  const { name, extension } = parseFileName(fileName)

  return {
    kind: ProviderKind.OneDrive,
    id,
    name,
    extension,
    size,
    downloadUrl,
    webUrl,
    mimeType: file.mimeType,
    bitrate: video?.bitrate,
    duration: video?.duration,
    height: video?.height,
    width: video?.width,
    audioChannels: video?.audioChannels,
    audioFormat: video?.audioFormat,
    fourCC: video?.fourCC,
    frameRate: video?.frameRate,
  }
}

export const updateFile = async (
  accessToken: string,
  file: OneDriveFile,
): Promise<OneDriveFile> => {
  const client = getClient(accessToken)
  const response = await fetchItem(client, file.id)
  const newFile = buildFile(response)

  if (newFile !== undefined) return newFile
  else throw new CannotFindFileError(file)
}

const indexFiles = async (
  client: Client,
  path: string,
  folderId: string,
): Promise<OneDriveFile[]> => {
  const { value: filesResponse } = await fetchItemChildren(client, folderId)

  return filesResponse.map(buildFile).filter(notUndefined)
}

const indexMovies = async (
  client: Client,
  path: string,
): Promise<MovieIndexResponse[]> => {
  const { value: moviesResponse } = await fetchMovies(client, path)

  return Promise.all(
    moviesResponse.map(async (movieResponse) => ({
      name: movieResponse.name,
      files: await indexFiles(client, path, movieResponse.id),
    })),
  )
}

const indexEpisodes = async (
  client: Client,
  path: string,
  seasonFolderId: string,
): Promise<EpisodeIndexResponse[]> => {
  const { value: episodesResponse } = await fetchItemChildren(
    client,
    seasonFolderId,
  )

  return Promise.all(
    episodesResponse.map(async (episodeResponse) => ({
      name: episodeResponse.name,
      files: await indexFiles(client, path, episodeResponse.id),
    })),
  )
}

const indexSeasons = async (
  client: Client,
  path: string,
  showFolderId: string,
): Promise<SeasonIndexResponse[]> => {
  const { value: seasonsResponse } = await fetchItemChildren(
    client,
    showFolderId,
  )

  return Promise.all(
    seasonsResponse.map(async (seasonResponse) => ({
      name: seasonResponse.name,
      episodes: await indexEpisodes(client, path, seasonResponse.id),
    })),
  )
}

const indexShows = async (
  client: Client,
  path: string,
): Promise<ShowIndexResponse[]> => {
  const { value: showsResponse } = await fetchShows(client, path)

  return Promise.all(
    showsResponse.map(async (showResponse) => ({
      name: showResponse.name,
      seasons: await indexSeasons(client, path, showResponse.id),
    })),
  )
}

export const index = async (
  accessToken: string,
  path: string,
): Promise<IndexResponse> => {
  const client = getClient(accessToken)

  return {
    movies: await indexMovies(client, path),
    shows: await indexShows(client, path),
  }
}
