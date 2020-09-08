export enum MediaItemType {
  Episode,
  Movie,
  Season,
  Show,
}

export interface MediaItem {
  type: MediaItemType
  id: number
  providerId: number
}
