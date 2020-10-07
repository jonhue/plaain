import './UpdateProviderModal.scss'
import React, { useCallback } from 'react'
import Modal from '../Modal'
import { Provider } from '../../types/providers/Provider'
import ProviderForm from './ProviderForm'
import { buildProviderName } from '../../util'
import { useTranslation } from 'react-i18next'

type UpdateProviderModalProps = {
  isActive: boolean
  provider: Provider

  onClose: () => void
  onUpdateProvider: (provider: Provider) => void
}

const UpdateProviderModal = ({
  isActive,
  provider,
  onClose,
  onUpdateProvider,
}: UpdateProviderModalProps) => {
  const { t } = useTranslation()

  const handleUpdate = useCallback(
    (moviesPath: string | undefined, showsPath: string | undefined) => {
      onUpdateProvider({ ...provider, moviesPath, showsPath })
      onClose()
    },
    [onClose, onUpdateProvider, provider],
  )

  return (
    <div className="UpdateProviderModal">
      <Modal isActive={isActive} onClose={onClose}>
        <h2>{buildProviderName(provider.kind)}</h2>
        <p>{provider.name}</p>
        <ProviderForm
          submitCaption={t('Update')}
          provider={provider}
          onSubmit={handleUpdate}
        />
      </Modal>
    </div>
  )
}

export default UpdateProviderModal
