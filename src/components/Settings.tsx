import './Settings.scss'
import { Provider, ProviderKind } from '../types/providers/Provider'
import React, { useCallback } from 'react'
import AddIcon from './icons/Nucleo/e-add'
import MicrosoftIcon from './icons/Nucleo/microsoft'
import { VERSION } from '../constants'
import styles from '../_variables.scss'
import { useTranslation } from 'react-i18next'

const providerIcon = {
  [ProviderKind.OneDrive]: <MicrosoftIcon color={styles.white} />,
}

type SettingsViewProps = {
  providers: Provider[]
  fetchMetadataAll: () => Promise<void>
  index: (providers: Provider[]) => Promise<void>
}

const SettingsView = ({
  providers,
  fetchMetadataAll,
  index,
}: SettingsViewProps) => {
  const { t } = useTranslation()

  const handleIndex = useCallback(() => {
    index(providers)
  }, [index, providers])

  const handleUpdateProvider = useCallback(
    () => console.log('update provider'),
    [],
  )
  const handleAddProvider = useCallback(() => console.log('add provider'), [])

  return (
    <div className="Settings">
      <section className="Settings__auth">
        <h2>{t('Authentication')}</h2>
        <p>
          {t(
            'Sign into your cloud to add your movies and TV shows to your library.',
          )}
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
              <AddIcon color={styles.white} />
            </a>
          </div>
        </div>
      </section>

      <section className="Settings__indexing">
        <h2>{t('Indexing')}</h2>
        <p>
          {t(
            'Index to look for new media on your linked services or fetch the latest metadata.',
          )}
        </p>
        <div className="Settings__indexing__actions">
          <button onClick={handleIndex}>{t('Index')}</button>
          <button onClick={fetchMetadataAll}>{t('Update metadata')}</button>
        </div>
      </section>

      <section className="Settings__version">
        <h2>{t('Version')}</h2>
        <p>{t('Plaain {{version}}.', { version: VERSION })}</p>
        <p className="small">
          {t('Plaain is {{openSource}}. See the {{changelog}}.', {
            openSource: (
              <a
                href="https://github.com/jonhue/plaain"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('open-source')}
              </a>
            ),
            changelog: (
              <a
                href="https://github.com/jonhue/plaain/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('changelog')}
              </a>
            ),
          })}
        </p>
        <p className="small">
          {t(
            'Note that Plaain may {{not}} be used to stream pirated content or publicly share your private media library. You may only connect to your private cloud storage.',
            { not: <span className="bold">{t('not')}</span> },
          )}
        </p>
      </section>
    </div>
  )
}

export default SettingsView
