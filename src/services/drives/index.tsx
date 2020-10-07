import {
  EpisodeIndexResponse,
  MovieIndexResponse,
  SeasonIndexResponse,
} from './types'
import { File, FileKind } from '../../types/files/File'
import { Provider, ProviderKind } from '../../types/providers/Provider'
import { Caption } from '../../types/files/captions/Caption'
import { EpisodeLike } from '../../types/items/Episode'
import { ItemKind } from '../../types/items/Item'
import { MovieLike } from '../../types/items/Movie'
import { SeasonLike } from '../../types/items/Season'
import { ShowLike } from '../../types/items/Show'
import { Video } from '../../types/files/videos/Video'
import { updateFile as oneDriveUpdateFile } from './OneDrive'

export const isCaption = (file: File): file is Caption =>
  file.kind === FileKind.Caption

export const isVideo = (file: File): file is Video =>
  file.kind === FileKind.Video

export const buildEpisodeLike = (showTmdbId: number, seasonNumber: number) => (
  item: EpisodeIndexResponse,
): EpisodeLike => ({
  kind: ItemKind.Episode,
  number: item.number,
  seasonNumber,
  showTmdbId,
  sources: item.files.filter(isVideo),
  captions: item.files.filter(isCaption),
  usage: {
    lastWatched: undefined,
    progress: undefined,
  },
})

export const buildMovieLike = (tmdbId: number) => (
  item: MovieIndexResponse,
): MovieLike => ({
  kind: ItemKind.Movie,
  tmdbId,
  sources: item.files.filter(isVideo),
  captions: item.files.filter(isCaption),
  usage: {
    lastWatched: undefined,
    progress: undefined,
  },
})

export const buildSeasonLike = (showTmdbId: number) => (
  item: SeasonIndexResponse,
): SeasonLike => ({
  kind: ItemKind.Season,
  number: item.number,
  showTmdbId,
  usage: {
    lastWatched: undefined,
    progress: undefined,
  },
})

export const buildShowLike = (tmdbId: number) => (): ShowLike => ({
  kind: ItemKind.Show,
  tmdbId,
  usage: {
    lastWatched: undefined,
    progress: undefined,
  },
})

export const updateFile = (provider: Provider, file: File): Promise<File> => {
  switch (provider.kind) {
    case ProviderKind.OneDrive:
      return oneDriveUpdateFile(provider.id, provider.accessToken.token, file)
  }
}
