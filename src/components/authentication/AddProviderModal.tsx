import './AddProviderModal.scss'
import { Provider, ProviderKind } from '../../types/providers/Provider'
import React, { useCallback, useState } from 'react'
import { AuthResponse } from '../../services/auth/types'
import { ChooseProvider } from './ChooseProvider'
import { Modal } from '../Modal'
import { SetupProvider } from './SetupProvider'
import { useModal } from '../../hooks/modal'
import { useSetupAuthRedirect } from '../../hooks/auth'

type AddProviderModalProps = {
  isActive: boolean

  onClose: () => void
  onSetupAuth: (kind: ProviderKind) => Promise<AuthResponse | undefined>
  onAddProvider: (provider: Provider) => void
}

export const AddProviderModal = ({
  isActive,
  onClose,
  onSetupAuth,
  onAddProvider,
}: AddProviderModalProps) => {
  const [show, handleOpen] = useModal()

  const [authResponse, setAuthResponse] = useState<AuthResponse | undefined>()
  useSetupAuthRedirect((response) => {
    setAuthResponse(response)
    handleOpen()
  })

  const handleChoose = useCallback(
    async (kind: ProviderKind) => {
      const authResponse = await onSetupAuth(kind)
      setAuthResponse(authResponse)
    },
    [setAuthResponse, onSetupAuth],
  )

  const handleSetup = useCallback(
    (moviesPath: string | undefined, showsPath: string | undefined) => {
      if (authResponse === undefined) return

      const provider = { ...authResponse, moviesPath, showsPath }
      onAddProvider(provider)
      onClose()
    },
    [authResponse, onAddProvider, onClose],
  )

  return (
    <div className="AddProviderModal">
      <Modal isActive={isActive || show} onClose={onClose}>
        {authResponse === undefined ? (
          <ChooseProvider onChoose={handleChoose} />
        ) : (
          <SetupProvider onSetup={handleSetup} />
        )}
      </Modal>
    </div>
  )
}
