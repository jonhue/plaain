import { GenericError } from '../../types/Notification'
import React from 'react'
import { Toast } from '../Toast'
import { useTranslation } from 'react-i18next'

type GenericErrorToastProps = {
  notification: GenericError

  onClose: () => void
}

export const GenericErrorToast = ({
  notification,
  onClose,
}: GenericErrorToastProps) => {
  const { t } = useTranslation()

  return (
    <Toast
      title={t('An error occurred')}
      text={notification.error.message}
      onClose={onClose}
    />
  )
}
