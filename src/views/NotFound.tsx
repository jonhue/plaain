import './NotFound.scss'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import React from 'react'

export const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="NotFound">
      <h2>{t('You want to get lost?')}</h2>
      <p>
        <Trans>
          This path went astray... If you do want to get lost, we recommend{' '}
          <a
            href="https://www.imdb.com/title/tt6969502/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Lost!
          </a>{' '}
          by Mirjam de With.
        </Trans>
      </p>
      <p>
        <Trans>
          If all you&apos;re looking for is to get back on track: you can{' '}
          <Link to="/app">find home this way</Link>.
        </Trans>
      </p>
    </div>
  )
}

export default NotFound
