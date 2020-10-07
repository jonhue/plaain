import './Settings.scss'
import { Provider, ProviderKind } from '../types/providers/Provider'
import React, { useCallback, useState } from 'react'
import AddIcon from './icons/Nucleo/e-add'
import AddProviderModal from './authentication/AddProviderModal'
import { AuthResponse } from '../services/auth/types'
import ProviderButton from './ProviderButton'
import UpdateProviderModal from './authentication/UpdateProviderModal'
import { VERSION } from '../constants'
import { buildProviderIcon } from '../util'
import classNames from 'classnames'
import styles from '../_variables.scss'
import { useTranslation } from 'react-i18next'

type SettingsViewProps = {
  providers: Provider[]

  onSetupAuth: (kind: ProviderKind) => Promise<AuthResponse | undefined>
  onAddProvider: (provider: Provider) => void
  onUpdateProvider: (provider: Provider) => void
  onIndex: () => void
  onFetchMetadataAll: () => void
}

const SettingsView = ({
  providers,
  onSetupAuth,
  onAddProvider,
  onUpdateProvider,
  onIndex,
  onFetchMetadataAll,
}: SettingsViewProps) => {
  const { t } = useTranslation()

  const [showAddProviderModal, setShowAddProviderModal] = useState(false)
  const [showUpdateProviderModals, setShowUpdateProviderModals] = useState<{
    [index: number]: boolean
  }>(providers.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}))

  const handleShowUpdateProviderModal = useCallback(
    (index: number) => () =>
      setShowUpdateProviderModals((state) => ({ ...state, [index]: true })),
    [setShowUpdateProviderModals],
  )
  const handleCloseUpdateProviderModal = useCallback(
    (index: number) => () =>
      setShowUpdateProviderModals((state) => ({ ...state, [index]: false })),
    [setShowUpdateProviderModals],
  )

  const handleShowAddProviderModal = useCallback(
    () => setShowAddProviderModal(true),
    [setShowAddProviderModal],
  )
  const handleCloseAddProviderModal = useCallback(
    () => setShowAddProviderModal(false),
    [setShowAddProviderModal],
  )

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
          <div className="Settings__auth__providers">
            {providers.map((provider, index) => (
              <div className="Settings__auth__provider" key={index}>
                <ProviderButton
                  className={classNames('primary', {
                    warn:
                      provider.moviesPath === undefined &&
                      provider.showsPath === undefined,
                  })}
                  icon={buildProviderIcon(provider.kind, styles.white)}
                  onClick={handleShowUpdateProviderModal(index)}
                />
                <UpdateProviderModal
                  isActive={showUpdateProviderModals[index]}
                  provider={provider}
                  onClose={handleCloseUpdateProviderModal(index)}
                  onUpdateProvider={onUpdateProvider}
                  key={7}
                />
              </div>
            ))}
            <div className="Settings__auth__provider" key={providers.length}>
              <ProviderButton
                icon={<AddIcon color={styles.white} />}
                onClick={handleShowAddProviderModal}
                key={5}
              />
              <AddProviderModal
                isActive={showAddProviderModal}
                onClose={handleCloseAddProviderModal}
                onSetupAuth={onSetupAuth}
                onAddProvider={onAddProvider}
                key={7}
              />
            </div>
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
          <button onClick={onIndex}>{t('Index')}</button>
          <button onClick={onFetchMetadataAll}>{t('Update metadata')}</button>
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
