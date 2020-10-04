import './Unauthenticated.scss'
import { Link } from 'react-router-dom'
import React from 'react'
import { useTranslation } from 'react-i18next'

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
        {t(
          'Note that Plaain may {{not}} be used to stream pirated content or publicly share your private media library. You may only connect to your private cloud storage.',
          { not: <span className="bold">{t('not')}</span> },
        )}
      </p>
    </div>
  )
}

export default UnauthenticatedView
