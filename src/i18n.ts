import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

const EN = 'en-US'
const LANGUAGES = [EN]

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    fallbackLng: EN,
    supportedLngs: LANGUAGES,
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV === 'development',
  })
