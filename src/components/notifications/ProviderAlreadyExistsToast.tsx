import { ProviderAlreadyExists } from '../../types/Notification'
import React from 'react'
import { Toast } from '../Toast'
import { buildProviderKindName } from '../../util'
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
        'You already linked your {{provider}} account {{name}} with Plaain. You can change your settings by clicking on the service in the authentication list on the settings page.',
        {
          name: notification.provider.name,
          provider: buildProviderKindName(notification.provider.kind),
        },
      )}
      onClose={onClose}
    />
  )
}
