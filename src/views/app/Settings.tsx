import { ConnectedProps, connect } from 'react-redux'
import { Provider, ProviderKind } from '../../types/providers/Provider'
import React, { useCallback } from 'react'
import { fetchMetadataAll, index } from '../../store/thunks'
import { AuthResponse } from '../../services/auth/types'
import { RootState } from '../../store'
import Settings from '../../components/Settings'
import { load } from '../../store/ui/thunks'
import { providersSelector } from '../../store/auth/selectors'
import { setupAuth } from '../../store/auth/thunks'
import { updateProvider } from '../../store/auth/actions'

const mapState = (state: RootState) => ({
  providers: providersSelector(state.auth),
})

const mapDispatch = { load, updateProvider }

const connector = connect(mapState, mapDispatch)

type SettingsViewProps = ConnectedProps<typeof connector>

const SettingsView = ({
  providers,
  load,
  updateProvider,
}: SettingsViewProps) => {
  const handleSetupAuth = useCallback(
    (kind: ProviderKind) =>
      load(setupAuth(kind)) as Promise<AuthResponse | undefined>,
    [load],
  )

  const handleUpdateProvider = useCallback(
    (provider: Provider) => {
      updateProvider(provider)
      load(index([provider]))
    },
    [load, updateProvider],
  )

  const handleIndex = useCallback(() => load(index(providers)), [
    load,
    providers,
  ])

  const handleFetchMetadataAll = useCallback(() => load(fetchMetadataAll()), [
    load,
  ])

  return (
    <Settings
      providers={providers}
      onSetupAuth={handleSetupAuth}
      onAddProvider={handleUpdateProvider}
      onUpdateProvider={handleUpdateProvider}
      onIndex={handleIndex}
      onFetchMetadataAll={handleFetchMetadataAll}
    />
  )
}

export default connector(SettingsView)
