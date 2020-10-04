import './NotFound.scss'
import { Link } from 'react-router-dom'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="NotFound">
      <h2>{t('You want to get lost?')}</h2>
      <p>
        {t(
          'This path went astray... If you do want to get lost, we recommend {{link}} by {{author}}.',
          {
            link: (
              <a
                href="https://www.imdb.com/title/tt6969502/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Lost!
              </a>
            ),
            author: 'Mirjam de With',
          },
        )}
      </p>
      <p>
        {t(
          "If all you're looking for is to get back on track: you can {{link}}.",
          { link: <Link to="/app">{t('find home this way')}</Link> },
        )}
      </p>
    </div>
  )
}

export default NotFound
