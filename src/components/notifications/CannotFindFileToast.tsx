import { CannotFindFile } from '../../types/Notification'
import React from 'react'
import Toast from '../Toast'
import { buildProviderKindName } from '../../util'
import { useTranslation } from 'react-i18next'

type CannotFindFileToastProps = {
  notification: CannotFindFile

  onClose: () => void
}

export const CannotFindFileToast = ({
  notification,
  onClose,
}: CannotFindFileToastProps) => {
  const { t } = useTranslation()

  return (
    <Toast
      title={t('Unable to locate file')}
      text={t(
        "We weren't able to locate the file named {{name}} located in your {{provider}} provider.",
        {
          name: notification.file.name,
          provider: buildProviderKindName(notification.file.provider.kind),
        },
      )}
      onClose={onClose}
    />
  )
}

export default CannotFindFileToast
