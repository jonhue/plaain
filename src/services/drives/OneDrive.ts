import { Caption, CaptionType } from '../../types/files/captions/Caption'
import {
  EpisodeIndexResponse,
  IndexResponse,
  MovieIndexResponse,
  SeasonIndexResponse,
  ShowIndexResponse,
} from './types'
import { File, FileKind } from '../../types/files/File'
import { Video, VideoType } from '../../types/files/videos/Video'
import {
  buildFileId,
  parseCaptionType,
  parseFileName,
  parseVideoType,
} from './util'
import { CannotFindFileError } from '../../errors/CannotFindFileError'
import { Client } from '@microsoft/microsoft-graph-client'
import { ProviderKind } from '../../types/providers/Provider'
import { notUndefined } from '../../util'

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

const buildCaption = (
  type: CaptionType,
  name: string,
  {
    id,
    name: fileName,
    size,
    webUrl,
    ['@microsoft.graph.downloadUrl']: downloadUrl,
  }: DriveItemResponse,
  { mimeType }: FileResponse,
): Caption => {
  return {
    kind: FileKind.Caption,
    type,
    id: buildFileId(ProviderKind.OneDrive, id),
    name,
    provider: {
      kind: ProviderKind.OneDrive,
      id,
      fileName,
      size,
      downloadUrl,
      webUrl,
      mimeType,
    },
  }
}

const buildVideo = (
  type: VideoType,
  name: string,
  {
    id,
    name: fileName,
    size,
    webUrl,
    ['@microsoft.graph.downloadUrl']: downloadUrl,
  }: DriveItemResponse,
  { mimeType }: FileResponse,
  {
    bitrate,
    duration,
    height,
    width,
    audioChannels,
    audioFormat,
    fourCC,
    frameRate,
  }: VideoResponse,
): Video => {
  return {
    kind: FileKind.Video,
    type,
    id: buildFileId(ProviderKind.OneDrive, id),
    name,
    provider: {
      kind: ProviderKind.OneDrive,
      id,
      fileName,
      size,
      downloadUrl,
      webUrl,
      mimeType,
      bitrate,
      duration,
      height,
      width,
      audioChannels,
      audioFormat,
      fourCC,
      frameRate,
    },
  }
}

const buildFile = (response: DriveItemResponse): File | undefined => {
  if (response.file === undefined) return

  const { name, extension } = parseFileName(response.name)
  if (extension === undefined) return

  const captionType = parseCaptionType(extension)
  const videoType = parseVideoType(extension)

  if (captionType !== undefined)
    return buildCaption(captionType, name, response, response.file)
  else if (videoType !== undefined && response.video !== undefined)
    return buildVideo(videoType, name, response, response.file, response.video)
}

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
