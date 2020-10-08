import './Authenticated.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

type AuthenticatedViewProps = {
  onIndex: () => void
}

const AuthenticatedView = ({ onIndex }: AuthenticatedViewProps) => {
  const { t } = useTranslation()

  return (
    <div className="Authenticated">
      <h2>{t('Get started')}</h2>
      <p>
        {t(
          "You signed into a cloud service, but we didn't find any movies or TV shows.",
        )}
      </p>
      <p>
        {t(
          "It's likely that you just have to move some of your files around and create some folders to make it work.",
        )}
      </p>
      <p>
        {t(
          "Reference the getting started guide to learn how to organize your files so that Plaain finds them. After you're done, just re-index.",
        )}
      </p>
      <div className="Authenticated__buttons">
        <a
          className="button primary"
          href="https://github.com/jonhue/plaain#getting-started"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Getting started')}
        </a>
        <button onClick={onIndex}>{t('Index')}</button>
      </div>
    </div>
  )
}

export default AuthenticatedView
