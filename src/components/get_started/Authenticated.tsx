import './Authenticated.scss'
import React, { useCallback } from 'react'
import { Provider } from '../../types/providers/Provider'
import { useTranslation } from 'react-i18next'

type AuthenticatedViewProps = {
  providers: Provider[]
  index: (providers: Provider[]) => Promise<void>
}

const AuthenticatedView = ({ providers, index }: AuthenticatedViewProps) => {
  const { t } = useTranslation()

  const handleIndex = useCallback(() => {
    index(providers)
  }, [index, providers])

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
        <button onClick={handleIndex}>{t('Index')}</button>
      </div>
    </div>
  )
}

export default AuthenticatedView
