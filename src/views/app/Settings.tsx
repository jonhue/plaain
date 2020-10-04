import { ConnectedProps, connect } from 'react-redux'
import { fetchMetadataAll, index } from '../../store/thunks'
import React from 'react'
import { RootState } from '../../store'
import Settings from '../../components/Settings'
import { providersSelector } from '../../store/auth/selectors'

const mapState = (state: RootState) => ({
  providers: providersSelector(state.auth),
})

const mapDispatch = { fetchMetadataAll, index }

const connector = connect(mapState, mapDispatch)

type SettingsViewProps = ConnectedProps<typeof connector>

const SettingsView = ({
  providers,
  fetchMetadataAll,
  index,
}: SettingsViewProps) => (
  <Settings
    providers={providers}
    fetchMetadataAll={fetchMetadataAll}
    index={index}
  />
)

export default connector(SettingsView)
