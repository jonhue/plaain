import './Unauthenticated.scss'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import React from 'react'

const UnauthenticatedView = () => {
  const { t } = useTranslation()

  return (
    <div className="Unauthenticated">
      <h2>{t('Get started')}</h2>
      <p>
        {t(
          'To watch your movies and TV shows, you first have to sign in with the cloud service that hosts your media.',
        )}
      </p>
      <Link to="/app/settings" className="button">
        {t('Authenticate')}
      </Link>
      <p className="small">
        <Trans>
          Note that Plaain may <span className="bold">not</span> be used to
          stream pirated content or publicly share your private media library.
          You may only connect to your private cloud storage.
        </Trans>
      </p>
    </div>
  )
}

export default UnauthenticatedView
