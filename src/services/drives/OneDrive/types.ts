export interface FileResponse {
  mimeType: string
}

export interface FolderResponse {
  childCount: number
}

export interface VideoResponse {
  bitrate: number
  duration: number
  height: number
  width: number
  audioChannels: number
  audioFormat: string
  fourCC: string
  frameRate: number
}

export interface DriveItemResponse {
  createdDateTime: string
  id: string
  lastModifiedDateTime: string
  name: string
  size: number
  webUrl: string
  folder: FolderResponse | undefined
  file: FileResponse | undefined
  video: VideoResponse | undefined
  '@microsoft.graph.downloadUrl': string
}

export interface DriveItemChildrenResponse {
  value: DriveItemResponse[]
}
