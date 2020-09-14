import { MOVIES_PATH, SHOWS_PATH } from '../../constants'
import { Client } from '@microsoft/microsoft-graph-client'
import { File } from '../../types/files/File'
import { OneDriveFile } from '../../types/files/providers/OneDriveFile'

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

export const index = async (
  accessToken: string,
  fileProvider: OneDriveFile,
): File => {
  const client = getClient(accessToken)
  const { name, size, webUrl, file, video } = await fetchItem(
    client,
    fileProvider.itemId,
  )
}

export const indexAll = async (accessToken: string) => {
  const client = getClient(accessToken)
  // return list of files (or some other structure)
}
