import './AddProviderModal.scss'
import { Provider, ProviderKind } from '../../types/providers/Provider'
import React, { useCallback, useState } from 'react'
import { AuthResponse } from '../../services/auth/types'
import ChooseProvider from './ChooseProvider'
import Modal from '../Modal'
import SetupProvider from './SetupProvider'

const MODAL_ANIMATION_DURATION = 250

type AddProviderModalProps = {
  isActive: boolean

  onClose: () => void
  onSetupAuth: (kind: ProviderKind) => Promise<AuthResponse | undefined>
  onAddProvider: (provider: Provider) => void
}

const AddProviderModal = ({
  isActive,
  onClose,
  onSetupAuth,
  onAddProvider,
}: AddProviderModalProps) => {
  const [authResponse, setAuthResponse] = useState<AuthResponse | undefined>()

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(() => setAuthResponse(undefined), MODAL_ANIMATION_DURATION)
  }, [onClose])

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
      setTimeout(() => setAuthResponse(undefined), MODAL_ANIMATION_DURATION)
    },
    [authResponse, onAddProvider, onClose, setAuthResponse],
  )

  return (
    <div className="AddProviderModal">
      <Modal isActive={isActive} onClose={handleClose}>
        {authResponse === undefined ? (
          <ChooseProvider onChoose={handleChoose} />
        ) : (
          <SetupProvider onSetup={handleSetup} />
        )}
      </Modal>
    </div>
  )
}

export default AddProviderModal
