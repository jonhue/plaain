import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import de from './locales/de/translation.json'
import en from './locales/en/translation.json'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

const DE = 'de'
const EN = 'en'
export const LANGUAGES = [DE, EN]

const resources = {
  [DE]: {
    translation: de,
  },
  [EN]: {
    translation: en,
  },
}

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: EN,
    supportedLngs: LANGUAGES,
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV === 'development',
  })
