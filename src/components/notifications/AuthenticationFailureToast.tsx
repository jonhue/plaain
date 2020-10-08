import { AuthenticationFailure } from '../../types/Notification'
import React from 'react'
import Toast from '../Toast'
import { buildProviderKindName } from '../../util'
import { useTranslation } from 'react-i18next'

type AuthenticationFailureToastProps = {
  notification: AuthenticationFailure

  onClose: () => void
}

export const AuthenticationFailureToast = ({
  notification,
  onClose,
}: AuthenticationFailureToastProps) => {
  const { t } = useTranslation()

  return (
    <Toast
      title={t('Authentication unsuccessful')}
      text={t(
        "Plaain wasn't able to authenticate with {{provider}}. Please report this error if it persists.",
        { provider: buildProviderKindName(notification.provider) },
      )}
      action={{
        text: t('Report'),
        url: 'https://github.com/jonhue/plaain/issues/new/choose',
      }}
      onClose={onClose}
    />
  )
}

export default AuthenticationFailureToast
