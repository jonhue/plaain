import { AppThunk } from '.'
import { Item } from '../types/items/Item'
import { Provider } from '../types/providers/Provider'

export const indexAll = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  console.log(dispatch, getState())
  // index all providers
}

export const index = (provider: Provider): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  console.log(dispatch, getState())
  // index single provider
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
  console.log(dispatch, getState())
  // fetch metadata for single item
}
