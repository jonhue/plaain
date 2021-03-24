import './AddProviderModal.scss'
import { AuthResponse, AuthSetup } from '../../services/auth/types'
import { Provider, ProviderKind } from '../../types/providers/Provider'
import React, { useCallback, useState } from 'react'
import { ChooseProvider } from './ChooseProvider'
import { EnterDetailsProvider } from './EnterDetailsProvider'
import { Modal } from '../Modal'
import { SetupProvider } from './SetupProvider'
import { useModal } from '../../hooks/modal'
import { useSetupAuthRedirect } from '../../hooks/auth'

enum State {
  Choose,
  EnterDetails,
  Setup,
}

type AddProviderModalProps = {
  isActive: boolean

  onClose: () => void
  onSetupAuth: (config: AuthSetup) => Promise<AuthResponse | undefined>
  onAddProvider: (provider: Provider) => void
}

export const AddProviderModal = ({
  isActive,
  onClose,
  onSetupAuth,
  onAddProvider,
}: AddProviderModalProps) => {
  const [show, handleOpen] = useModal()

  const [state, setState] = useState(State.Choose)
  const [kind, setKind] = useState<ProviderKind | undefined>()
  const [authResponse, setAuthResponse] = useState<AuthResponse | undefined>()
  useSetupAuthRedirect((response) => {
    setAuthResponse(response)
    handleOpen()
  })

  const handleChoose = useCallback(
    async (kind: ProviderKind) => {
      setKind(kind)
      switch (kind) {
        case ProviderKind.FTP:
          setState(State.EnterDetails)
          return
        case ProviderKind.OneDrive:
          const authResponse = await onSetupAuth({ kind })
          setAuthResponse(authResponse)
          setState(State.Setup)
          return
      }
    },
    [setAuthResponse, setKind, onSetupAuth, setState],
  )

  const handleEnteredDetails = useCallback(
    async (config: AuthSetup) => {
      const authResponse = await onSetupAuth(config)
      setAuthResponse(authResponse)
      setState(State.Setup)
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
        {state === State.Choose ? (
          <ChooseProvider onChoose={handleChoose} />
        ) : state === State.EnterDetails ? (
          <EnterDetailsProvider
            kind={kind!}
            onEnteredDetails={handleEnteredDetails}
          />
        ) : state === State.Setup ? (
          <SetupProvider onSetup={handleSetup} />
        ) : null}
      </Modal>
    </div>
  )
}
