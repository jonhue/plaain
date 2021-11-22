import './Welcome.scss'
import { Backdrop } from '../components/Backdrop'
import { Link } from 'react-router-dom'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Welcome = () => {
  const { t } = useTranslation()

  return (
    <div className="Welcome">
      <div className="Welcome__backdrop">
        <Backdrop url={process.env.PUBLIC_URL + '/welcome.png'} />
      </div>
      <div className="Welcome__wrapper">
        <h1>
          {t('Your movies & TV shows.')}
          <br />
          {t('Anywhere.')}
        </h1>
        <div className="Welcome__details">
          <h3>
            {t(
              'Plaain lets you stream and maintain your media library from anywhere. No server needed, no fee required.',
            )}
          </h3>
          <div className="Welcome__details__actions">
            <Link to="/app" className="button primary">
              {t('Launch')}
            </Link>
            <a
              href="https://github.com/jonhue/plaain#getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              {t('How it works')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
