import { AppThunk } from '.'

export const indexAll = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  console.log(dispatch, getState())
  // index all providers
}

export const fetchMetadataAll = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState,
) => {
  console.log(dispatch, getState())
  // fetch metadata for all media
}
