import './UpdateProviderModal.scss'
import { AuthResponse, AuthSetup } from '../../services/auth/types'
import { Provider, ProviderKind } from '../../types/providers/Provider'
import React, { useCallback, useState } from 'react'
import { FTPProviderForm } from './FTPProviderForm'
import { Modal } from '../Modal'
import { ProviderForm } from './ProviderForm'
import { buildProviderKindName } from '../../util'
import { useTranslation } from 'react-i18next'

enum State {
  Specific,
  General,
}

type UpdateProviderModalProps = {
  isActive: boolean
  provider: Provider

  onClose: () => void
  onSetupAuth: (config: AuthSetup) => Promise<AuthResponse | undefined>
  onUpdateProvider: (provider: Provider) => void
  onRemoveProvider: () => void
}

export const UpdateProviderModal = ({
  isActive,
  provider,
  onClose,
  onSetupAuth,
  onUpdateProvider,
  onRemoveProvider,
}: UpdateProviderModalProps) => {
  const { t } = useTranslation()

  const [state, setState] = useState(
    provider.kind === ProviderKind.FTP ? State.Specific : State.General,
  )
  const [details, setDetails] = useState<AuthResponse | undefined>()

  const handleDetails = useCallback(
    async (config: AuthSetup) => {
      const authResponse = await onSetupAuth(config)
      setDetails(authResponse)
      setState(State.General)
    },
    [setDetails, setState],
  )

  const handleUpdate = useCallback(
    (moviesPath: string | undefined, showsPath: string | undefined) => {
      const newProvider: Provider =
        details !== undefined
          ? { ...details, moviesPath, showsPath }
          : { ...provider, moviesPath, showsPath }
      onUpdateProvider(newProvider)
      onClose()
    },
    [details, onClose, onUpdateProvider, provider],
  )

  const handleRemoveProvider = useCallback(() => {
    if (!window.confirm(t('Are you sure?'))) return

    onRemoveProvider()
    onClose()
  }, [onClose, onRemoveProvider, t])

  return (
    <div className="UpdateProviderModal">
      <Modal isActive={isActive} onClose={onClose}>
        <h2>{buildProviderKindName(t, provider.kind)}</h2>
        <p>{provider.name}</p>
        {state === State.Specific ? (
          <>
            {provider.kind === ProviderKind.FTP ? (
              <FTPProviderForm
                submitCaption={t('Continue')}
                provider={provider}
                onSubmit={handleDetails}
              />
            ) : null}
          </>
        ) : state === State.General ? (
          <ProviderForm
            submitCaption={t('Update')}
            provider={provider}
            onSubmit={handleUpdate}
          />
        ) : null}
        <button className="secondary" onClick={handleRemoveProvider}>
          {t('Remove')}
        </button>
      </Modal>
    </div>
  )
}
