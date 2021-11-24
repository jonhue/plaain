import './Nav.scss'
import { FindIcon } from './icons/Nucleo/FindIcon'
import { ForYouIcon } from './icons/Nucleo/ForYouIcon'
import { MovieIcon } from './icons/Nucleo/MovieIcon'
import React from 'react'
import { SettingsIcon } from './icons/Nucleo/SettingsIcon'
import { ShowIcon } from './icons/Nucleo/ShowIcon'
import { Tab } from './Tab'
import { useTranslation } from 'react-i18next'

type NavProps = {
  moviesDisabled?: boolean
  showsDisabled?: boolean
}

export const Nav = ({ moviesDisabled, showsDisabled }: NavProps) => {
  const { t } = useTranslation()

  return (
    <div className="Nav">
      <div className="Nav__wrapper">
        <Tab to="/app" end>
          <ForYouIcon />
          <p>{t('For you')}</p>
        </Tab>
        <Tab disabled={moviesDisabled} to="/app/movies">
          <MovieIcon />
          <p>{t('Movies')}</p>
        </Tab>
        <Tab disabled={showsDisabled} to="/app/shows">
          <ShowIcon />
          <p>{t('Shows')}</p>
        </Tab>
        <Tab disabled={moviesDisabled && showsDisabled} to="/app/find">
          <FindIcon />
          <p>{t('Find')}</p>
        </Tab>
        <Tab to="/app/settings">
          <SettingsIcon />
          <p>{t('Settings')}</p>
        </Tab>
      </div>
    </div>
  )
}
