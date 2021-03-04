import './Setup.scss'
import { Link } from 'react-router-dom'
import { Movie } from '../../types/items/Movie'
import React from 'react'
import { Show } from '../../types/items/Show'
import { useTranslation } from 'react-i18next'

type SetupProps = {
  movies: Movie[]
  shows: Show[]
}

export const Setup = ({ movies, shows }: SetupProps) => {
  const { t } = useTranslation()

  return (
    <div className="Setup">
      <h2>{t('Get started')}</h2>
      <p>
        {t(
          "Here, you'll be able to find your recently watched movie or the show you didn't finish yet.",
        )}
      </p>
      <div className="Setup__buttons">
        {movies.length > 0 && (
          <Link to="/app/movies" className="button">
            {t('Discover your movies')}
          </Link>
        )}
        {shows.length > 0 && (
          <Link to="/app/shows" className="button">
            {t('Discover your shows')}
          </Link>
        )}
      </div>
    </div>
  )
}
