import './Settings.scss'
import { AppDispatch, RootState } from '../../store'
import React, { useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { buildCommitId, buildProviderIcon } from '../../util'
import { fetchAllMetadata, index } from '../../store/thunks'
import { removeProvider, updateProvider } from '../../store/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AddIcon } from '../../components/icons/Nucleo/AddIcon'
import { AddProviderModal } from '../../components/authentication/AddProviderModal'
import { AuthSetup } from '../../services/auth/types'
import { LanguageSelector } from '../../components/LanguageSelector'
import { Provider } from '../../types/providers/Provider'
import { ProviderButton } from '../../components/ProviderButton'
import { UpdateProviderModal } from '../../components/authentication/UpdateProviderModal'
import { VERSION } from '../../constants'
import classNames from 'classnames'
import { load } from '../../store/ui/thunks'
import { providersSelector } from '../../store/auth/selectors'
import { setupAuth } from '../../store/auth/thunks'
import { useModal } from '../../hooks/modal'

export const Settings = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()

  const providers = useSelector((state: RootState) =>
    providersSelector(state.auth),
  )

  const handleSetupAuth = useCallback(
    (config: AuthSetup) => dispatch(load(setupAuth(config))),
    [dispatch],
  )

  const handleUpdateProvider = useCallback(
    (provider: Provider) => {
      dispatch(updateProvider(provider))
      dispatch(load(index([provider])))
    },
    [dispatch],
  )

  const handleIndex = useCallback(
    () => dispatch(load(index(providers))),
    [dispatch, providers],
  )

  const handleFetchMetadataAll = useCallback(
    () => dispatch(load(fetchAllMetadata())),
    [dispatch],
  )

  const handleRemoveProvider = useCallback(
    (id: string) => () => dispatch(removeProvider(id)),
    [dispatch],
  )

  const [
    showAddProviderModal,
    handleShowAddProviderModal,
    handleCloseAddProviderModal,
  ] = useModal()

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
                  icon={buildProviderIcon(provider.kind)}
                  onClick={handleShowUpdateProviderModal(index)}
                />
                <UpdateProviderModal
                  isActive={showUpdateProviderModals[index]}
                  provider={provider}
                  onClose={handleCloseUpdateProviderModal(index)}
                  onSetupAuth={handleSetupAuth}
                  onUpdateProvider={handleUpdateProvider}
                  onRemoveProvider={handleRemoveProvider(provider.id)}
                  key={7}
                />
              </div>
            ))}
            <div className="Settings__auth__provider" key={providers.length}>
              <ProviderButton
                icon={<AddIcon />}
                onClick={handleShowAddProviderModal}
                key={5}
              />
              <AddProviderModal
                isActive={showAddProviderModal}
                onClose={handleCloseAddProviderModal}
                onSetupAuth={handleSetupAuth}
                onAddProvider={handleUpdateProvider}
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
          <button disabled={providers.length === 0} onClick={handleIndex}>
            {t('Index')}
          </button>
          <button
            disabled={providers.length === 0}
            onClick={handleFetchMetadataAll}
          >
            {t('Update metadata')}
          </button>
        </div>
      </section>

      <section className="Settings__language">
        <h2>{t('Language')}</h2>
        <p>{t('Change the display language.')}</p>
        <LanguageSelector onChange={handleFetchMetadataAll} />
      </section>

      <section className="Settings__version">
        <h2>{t('Version')}</h2>
        <p>{t('Plaain {{version}}.', { version: VERSION })}</p>
        <p className="small">
          <Trans>
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
          </Trans>
        </p>
        <p className="small">
          <Trans>
            You are running commit{' '}
            <a
              href={`https://github.com/jonhue/plaain/commit/${process.env.REACT_APP_GIT_SHA}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {process.env.REACT_APP_GIT_SHA
                ? buildCommitId(process.env.REACT_APP_GIT_SHA)
                : t('Unknown')}
            </a>
            .
          </Trans>
        </p>
        <p className="small">
          <Trans>
            Note that Plaain may <span className="bold">not</span> be used to
            stream pirated content or publicly share your private media library.
            You may only connect to your private cloud storage.
          </Trans>
        </p>
      </section>
    </div>
  )
}
