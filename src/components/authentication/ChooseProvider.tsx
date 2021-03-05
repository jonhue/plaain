import './ChooseProvider.scss'
import { PROVIDER_KINDS, ProviderKind } from '../../types/providers/Provider'
import React, { useCallback } from 'react'
import { ProviderButton } from '../ProviderButton'
import { buildProviderIcon } from '../../util'
import { useTranslation } from 'react-i18next'

type ChooseProviderProps = {
  onChoose: (kind: ProviderKind) => Promise<void>
}

export const ChooseProvider = ({ onChoose }: ChooseProviderProps) => {
  const { t } = useTranslation()

  const handleChoose = useCallback(
    (kind: ProviderKind) => () => onChoose(kind),
    [onChoose],
  )

  return (
    <div className="ChooseProvider">
      <h2>{t('Add a provider')}</h2>
      <p>
        {t(
          'Select which service you want to use to stream your movies & shows.',
        )}
      </p>
      <div className="ChooseProvider__providers">
        {PROVIDER_KINDS.map((kind, index) => (
          <ProviderButton
            icon={buildProviderIcon(kind)}
            onClick={handleChoose(kind)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
