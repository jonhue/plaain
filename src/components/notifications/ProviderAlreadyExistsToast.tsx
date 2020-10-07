import { ProviderAlreadyExists } from '../../types/Notification'
import React from 'react'
import Toast from '../Toast'
import { buildProviderName } from '../../util'
import { useTranslation } from 'react-i18next'

type ProviderAlreadyExistsToastProps = {
  notification: ProviderAlreadyExists

  onClose: () => void
}

export const ProviderAlreadyExistsToast = ({
  notification,
  onClose,
}: ProviderAlreadyExistsToastProps) => {
  const { t } = useTranslation()

  return (
    <Toast
      title={t('Provider already exists')}
      text={t(
        "You're already authenticated with {{provider}} and account {{name}}. You can change your settings by clicking on the provider in the authentication list on the settings page.",
        {
          name: notification.provider.name,
          provider: buildProviderName(notification.provider.kind),
        },
      )}
      onClose={onClose}
    />
  )
}

export default ProviderAlreadyExistsToast
