import { APIError } from '../../types/Notification'
import React from 'react'
import { Toast } from '../Toast'
import { useTranslation } from 'react-i18next'

type APIErrorToastProps = {
  notification: APIError

  onClose: () => void
}

export const APIErrorToast = ({
  notification,
  onClose,
}: APIErrorToastProps) => {
  const { t } = useTranslation()

  return (
    <Toast
      title={t('Error connecting to service')}
      text={t(
        "Plaain wasn't able to connect to one of your services. Please report this incident. Status code: {{status}}. Message: {{message}}.",
        {
          status: notification.status,
          message: notification.message || t('None'),
        },
      )}
      action={{
        text: t('Report'),
        url: 'https://github.com/jonhue/plaain/issues/new/choose',
      }}
      onClose={onClose}
    />
  )
}
