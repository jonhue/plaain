import { Provider, ProviderKind } from '../types/providers/Provider'
import { AppThunk } from '.'
import { FileProvider } from '../types/files/FileProvider'
import { IndexResponse } from '../services/drives/types'
import { Item } from '../types/items/Item'
import { auth } from './auth/thunks'
import { removeFilesByProvider as episodeRemoveFilesByProvider } from './episodes/thunks'
import { episodesSelector } from './episodes/selectors'
import { removeFilesByProvider as movieRemoveFilesByProvider } from './movies/thunks'
import { moviesSelector } from './movies/selectors'
import { index as oneDriveIndexCall } from '../services/drives/OneDrive'
import { removeProvider as removeProviderAction } from './auth/actions'

const indexHandleProvider = (provider: Provider): Promise<IndexResponse> => {
  switch (provider.kind) {
    case ProviderKind.OneDrive:
      return oneDriveIndexCall(
        provider.id,
        provider.accessToken.token,
        provider.moviesPath,
        provider.showsPath,
      )
  }
}

export const index = (providers: Provider[]): AppThunk<Promise<void>> => async (
  dispatch,
) => {
  await Promise.all(
    providers.map(async (provider) => {
      await dispatch(auth(provider))
      const response = await indexHandleProvider(provider)
      console.log(response)
    }),
  )
}

export const updateFile = (
  file: FileProvider,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
  console.log(file, dispatch, getState())
  // update single file
}

export const fetchMetadataAll = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  console.log(dispatch, getState())
  // fetch metadata for all items
}

export const fetchMetadata = (item: Item): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  console.log(item, dispatch, getState())
  // fetch metadata for single item
}

export const removeProvider = (id: string): AppThunk<void> => (
  dispatch,
  getState,
) => {
  dispatch(removeProviderAction(id))

  const { episodes, movies } = getState()
  episodesSelector(episodes).forEach((episode) =>
    dispatch(episodeRemoveFilesByProvider(episode, id)),
  )
  moviesSelector(movies).forEach((movie) =>
    dispatch(movieRemoveFilesByProvider(movie, id)),
  )
}
