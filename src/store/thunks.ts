import { Provider, ProviderKind } from '../types/providers/Provider'
import { AppThunk } from '.'
import { FileProvider } from '../types/files/FileProvider'
import { IndexResponse } from '../services/drives/types'
import { Item } from '../types/items/Item'
import { index as oneDriveIndexCall } from '../services/drives/OneDrive'

const indexHandleProvider = (provider: Provider): Promise<IndexResponse> => {
  switch (provider.kind) {
    case ProviderKind.OneDrive:
      return oneDriveIndexCall(
        provider.accessToken.token,
        provider.moviesPath,
        provider.showsPath,
      )
  }
}

export const index = (providers: Provider[]): AppThunk<Promise<void>> => async (
  dispatch,
) => {
  console.log(dispatch)
  providers.forEach(async (provider) => {
    const response = await indexHandleProvider(provider)
    console.log(response)
  })
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
