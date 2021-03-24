import './EnterDetailsProvider.scss'
import { AuthSetup } from '../../services/auth/types'
import { FTPProviderForm } from './FTPProviderForm'
import { ProviderKind } from '../../types/providers/Provider'
import React from 'react'
import { useTranslation } from 'react-i18next'

type EnterDetailsProviderProps = {
  kind: ProviderKind
  onEnteredDetails: (config: AuthSetup) => void
}

export const EnterDetailsProvider = ({
  kind,
  onEnteredDetails,
}: EnterDetailsProviderProps) => {
  const { t } = useTranslation()

  return (
    <div className="EnterDetailsProvider">
      <h2>{t('Configure your provider')}</h2>
      <p>{t('Plaain needs some more details to connect to your provider.')}</p>
      {kind === ProviderKind.FTP ? (
        <FTPProviderForm
          submitCaption={t('Continue')}
          onSubmit={onEnteredDetails}
        />
      ) : null}
    </div>
  )
}
