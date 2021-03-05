import React, { useCallback } from 'react'
import { LANGUAGES } from '../i18n'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

export const LanguageSelector = () => {
  const { t } = useTranslation()

  const handleChange = useCallback(
    (event) => i18next.changeLanguage(event.target.value),
    [],
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
