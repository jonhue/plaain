// import { fetchItem, fetchItems, getClient } from './api'
import { CannotFindFileError } from '../../../errors/CannotFindFileError'
import { FTP } from '../../../types/providers/FTP'
import { File } from '../../../types/files/File'
import {
  // EpisodeIndexResponse,
  IndexResponse,
  // MovieIndexResponse,
  // SeasonIndexResponse,
  // ShowIndexResponse,
} from '../types'
// import { ProviderKind } from '../../../types/providers/Provider'
// import { buildFile } from './util'
// import { notUndefined } from '../../../util'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateFile = async (provider: FTP, file: File): Promise<File> => {
  throw new CannotFindFileError(file)

  // const client = await getClient(
  //   provider.host,
  //   provider.port,
  //   provider.username,
  //   provider.password,
  //   provider.secure,
  // )
  // const response = await fetchItem(client, file.provider.fileName)
  // if (response === undefined) throw new CannotFindFileError(file)
  // if (file.provider.kind !== ProviderKind.FTP)
  //   throw new Error(
  //     'Internal error: attempted to update file with the wrong provider.',
  //   )
  // const newFile = buildFile(provider.id, file.provider.path)(response)

  // if (newFile !== undefined) return newFile
  // else throw new CannotFindFileError(file)
}

// const indexFiles = async (
//   providerId: string,
//   client: Client,
//   path: string,
// ): Promise<File[]> => {
//   const filesResponse = await fetchItems(client, path)
//   return filesResponse.map(buildFile(providerId, path)).filter(notUndefined)
// }

// const indexMovies = async (
//   providerId: string,
//   client: Client,
//   path: string | undefined,
// ): Promise<MovieIndexResponse[]> => {
//   if (path === undefined) return []

//   const moviesResponse = await fetchItems(client, path)

//   return Promise.all(
//     moviesResponse.map(async (movieResponse) => ({
//       name: movieResponse.name,
//       files: await indexFiles(
//         providerId,
//         client,
//         `${path}/${movieResponse.name}`,
//       ),
//     })),
//   )
// }

// const indexEpisodes = async (
//   providerId: string,
//   client: Client,
//   seasonFolderPath: string,
// ): Promise<EpisodeIndexResponse[]> => {
//   const episodesResponse = await fetchItems(client, seasonFolderPath)

//   const episodes = await Promise.all(
//     episodesResponse.map(async (episodeResponse) => {
//       const number = Number.parseInt(episodeResponse.name)
//       if (isNaN(number)) return

//       return {
//         number,
//         files: await indexFiles(
//           providerId,
//           client,
//           `${seasonFolderPath}/${episodeResponse.name}`,
//         ),
//       }
//     }),
//   )

//   return episodes.filter(notUndefined)
// }

// const indexSeasons = async (
//   providerId: string,
//   client: Client,
//   showFolderPath: string,
// ): Promise<SeasonIndexResponse[]> => {
//   const seasonsResponse = await fetchItems(client, showFolderPath)

//   const seasons = await Promise.all(
//     seasonsResponse.map(async (seasonResponse) => {
//       const number = Number.parseInt(seasonResponse.name)
//       if (isNaN(number)) return

//       return {
//         number,
//         episodes: await indexEpisodes(
//           providerId,
//           client,
//           `${showFolderPath}/${seasonResponse.name}`,
//         ),
//       }
//     }),
//   )

//   return seasons.filter(notUndefined)
// }

// const indexShows = async (
//   providerId: string,
//   client: Client,
//   path: string | undefined,
// ): Promise<ShowIndexResponse[]> => {
//   if (path === undefined) return []

//   const showsResponse = await fetchItems(client, path)

//   return Promise.all(
//     showsResponse.map(async (showResponse) => ({
//       name: showResponse.name,
//       seasons: await indexSeasons(
//         providerId,
//         client,
//         `${path}/${showResponse.name}`,
//       ),
//     })),
//   )
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const index = async (provider: FTP): Promise<IndexResponse> => {
  return {
    movies: [],
    shows: [],
  }

  // const client = await getClient(
  //   provider.host,
  //   provider.port,
  //   provider.username,
  //   provider.password,
  //   provider.secure,
  // )

  // return {
  //   movies: await indexMovies(provider.id, client, provider.moviesPath),
  //   shows: await indexShows(provider.id, client, provider.showsPath),
  // }
}
