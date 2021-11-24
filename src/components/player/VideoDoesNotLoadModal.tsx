import './VideoDoesNotLoadModal.scss'
import React, { useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Modal } from '../Modal'

type VideoDoesNotLoadModalProps = {
  isActive: boolean

  onClose: () => void
}

export const VideoDoesNotLoadModal = ({
  isActive,
  onClose,
}: VideoDoesNotLoadModalProps) => {
  const { t } = useTranslation()

  const handleReload = useCallback(() => window.location.reload(), [])

  return (
    <div className="VideoDoesNotLoadModal">
      <Modal isActive={isActive} onClose={onClose}>
        <h2>{t("The video doesn't load?")}</h2>
        <p className="small">
          <Trans>
            Restarting may help. Please{' '}
            <a
              href="https://github.com/jonhue/plaain/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              report the issue
            </a>{' '}
            if it persists.
          </Trans>
        </p>
        <button className="small" onClick={handleReload}>
          {t('Reload')}
        </button>
      </Modal>
    </div>
  )
}
