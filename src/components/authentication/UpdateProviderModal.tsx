import './UpdateProviderModal.scss'
import React, { useCallback } from 'react'
import Modal from '../Modal'
import { Provider } from '../../types/providers/Provider'
import ProviderForm from './ProviderForm'
import { buildProviderKindName } from '../../util'
import { useTranslation } from 'react-i18next'

type UpdateProviderModalProps = {
  isActive: boolean
  provider: Provider

  onClose: () => void
  onUpdateProvider: (provider: Provider) => void
  onRemoveProvider: () => void
}

const UpdateProviderModal = ({
  isActive,
  provider,
  onClose,
  onUpdateProvider,
  onRemoveProvider,
}: UpdateProviderModalProps) => {
  const { t } = useTranslation()

  const handleUpdate = useCallback(
    (moviesPath: string | undefined, showsPath: string | undefined) => {
      onUpdateProvider({ ...provider, moviesPath, showsPath })
      onClose()
    },
    [onClose, onUpdateProvider, provider],
  )

  const handleRemoveProvider = useCallback(() => {
    if (!window.confirm(t('Are you sure?'))) return

    onRemoveProvider()
    onClose()
  }, [onClose, onRemoveProvider, t])

  return (
    <div className="UpdateProviderModal">
      <Modal isActive={isActive} onClose={onClose}>
        <h2>{buildProviderKindName(provider.kind)}</h2>
        <p>{provider.name}</p>
        <ProviderForm
          submitCaption={t('Update')}
          provider={provider}
          onSubmit={handleUpdate}
        />
        <button className="secondary" onClick={handleRemoveProvider}>
          {t('Remove')}
        </button>
      </Modal>
    </div>
  )
}

export default UpdateProviderModal
