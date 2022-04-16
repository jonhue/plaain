import React, { useCallback } from 'react'
import { LANGUAGES } from '../i18n'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

type LanguageSelectorProps = {
  onChange?: (lng: string | undefined) => void
}

export const LanguageSelector = ({ onChange }: LanguageSelectorProps) => {
  const { t } = useTranslation()

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      i18next.changeLanguage(event.target.value)
      if (onChange) onChange(event.target.value)
    },
    [onChange],
  )

  return (
    <div className="LanguageSelector">
      <select defaultValue={i18next.language} onChange={handleChange}>
        {LANGUAGES.map((language) => (
          <option value={language} key={language}>
            {t(language)}
          </option>
        ))}
      </select>
    </div>
  )
}
