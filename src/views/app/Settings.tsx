import { AppDispatch, RootState } from '../../store'
import { Provider, ProviderKind } from '../../types/providers/Provider'
import React, { useCallback } from 'react'
import { fetchAllMetadata, index, removeProvider } from '../../store/thunks'
import { useDispatch, useSelector } from 'react-redux'
import Settings from '../../components/Settings'
import { load } from '../../store/ui/thunks'
import { providersSelector } from '../../store/auth/selectors'
import { setupAuth } from '../../store/auth/thunks'
import { updateProvider } from '../../store/auth/actions'

const SettingsView = () => {
  const dispatch = useDispatch<AppDispatch>()

  const providers = useSelector((state: RootState) =>
    providersSelector(state.auth),
  )

  const handleSetupAuth = useCallback(
    (kind: ProviderKind) => dispatch(load(setupAuth(kind))),
    [dispatch],
  )

  const handleUpdateProvider = useCallback(
    (provider: Provider) => {
      dispatch(updateProvider(provider))
      dispatch(load(index([provider])))
    },
    [dispatch],
  )

  const handleIndex = useCallback(() => dispatch(load(index(providers))), [
    dispatch,
  ])

  const handleFetchMetadataAll = useCallback(
    () => dispatch(load(fetchAllMetadata())),
    [dispatch],
  )

  return (
    <Settings
      providers={providers}
      onSetupAuth={handleSetupAuth}
      onAddProvider={handleUpdateProvider}
      onUpdateProvider={handleUpdateProvider}
      onRemoveProvider={removeProvider}
      onIndex={handleIndex}
      onFetchMetadataAll={handleFetchMetadataAll}
    />
  )
}

export default SettingsView
