import './Settings.scss'
import { ConnectedProps, connect } from 'react-redux'
import React, { useCallback } from 'react'
import { fetchMetadataAll, index } from '../../store/thunks'
import AddIcon from '../../components/Nucleo/icons/add.jsx'
import MicrosoftIcon from '../../components/Nucleo/icons/microsoft.jsx'
import { ProviderKind } from '../../types/providers/Provider'
import { RootState } from '../../store'
import { VERSION } from '../../constants'
import { providersSelector } from '../../store/auth/selectors'

const providerIcon = {
  [ProviderKind.OneDrive]: <MicrosoftIcon width={32} height={32} />,
}

const mapState = (state: RootState) => ({
  providers: providersSelector(state.auth),
})
const mapDispatch = { index, fetchMetadataAll }

const connector = connect(mapState, mapDispatch)

type SettingsProps = ConnectedProps<typeof connector>

const Settings = ({ index, fetchMetadataAll, providers }: SettingsProps) => {
  const handleIndex = useCallback(() => {
    index(providers)
  }, [index, providers])

  return (
    <div className="Settings">
      <section className="Settings__auth">
        <h2>Authentication</h2>
        <p>
          Sign into your cloud to add your movies and TV shows to your library.
        </p>
        <div className="Settings__auth__scroll">
          <div className="Settings__auth__flex">
            {providers.map((provider, index) => (
              <button
                className="primary"
                onClick={handleUpdateProvider}
                key={index}
              >
                {providerIcon[provider.kind]}
                {provider.name}
              </button>
            ))}
            <a className="button" onClick={handleAddProvider}>
              <AddIcon width={32} height={32} />
            </a>
          </div>
        </div>
      </section>

      <section className="Settings__indexing">
        <h2>Indexing</h2>
        <p>
          Index to look for new media on your linked services or fetch the
          latest metadata.
        </p>
        <div className="Settings__indexing__actions">
          <button onClick={handleIndex}>Index</button>
          <button onClick={fetchMetadataAll}>Update metadata</button>
        </div>
      </section>

      <section className="Settings__version">
        <h2>Version</h2>
        <p>Plaain {VERSION}.</p>
        <p className="small">
          Plaain is{' '}
          <a
            href="https://github.com/jonhue/plaain"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-source
          </a>
          . See the{' '}
          <a
            href="https://github.com/jonhue/plaain/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            changelog
          </a>
          .
        </p>
        <p className="small">
          Note that Plaain may <span className="bold">not</span> be used to
          stream pirated content or publicly share your private media library.
          You may only connect to your private cloud storage.
        </p>
      </section>
    </div>
  )
}

export default connector(Settings)
