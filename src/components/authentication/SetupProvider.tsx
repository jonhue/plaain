import './SetupProvider.scss'
import { ProviderForm } from './ProviderForm'
import React from 'react'
import { useTranslation } from 'react-i18next'

type SetupProviderProps = {
  onSetup: (
    moviesPath: string | undefined,
    showsPath: string | undefined,
  ) => void
}

export const SetupProvider = ({ onSetup }: SetupProviderProps) => {
  const { t } = useTranslation()

  return (
    <div className="SetupProvider">
      <h2>{t('Setup your provider')}</h2>
      <p>
        {t(
          "All that's left is to tell Plaain where to look for your movies and shows. You can always skip this step and come back later.",
        )}
      </p>
      <ProviderForm submitCaption={t('Complete')} onSubmit={onSetup} />
    </div>
  )
}
