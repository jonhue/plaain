import './Movie.scss'
import React, { useCallback } from 'react'
import {
  buildBackdropUrl,
  buildCoverUrl,
  isInProgress,
  splitHoursAndMinutes,
} from '../util'
import Backdrop from './Backdrop'
import Cover from './Cover'
import FileList from './FileList'
import { Movie } from '../types/items/Movie'
import PersonList from './PersonList'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type MovieViewProps = {
  movie: Movie
}

const MovieView = ({ movie }: MovieViewProps) => {
  const { t } = useTranslation()
  const history = useHistory()

  const handleContinue = useCallback(() => {
    history.push(
      `/player?id=${movie.id}&type=${movie.kind}&s=${movie.usage.progress}`,
    )
  }, [history, movie])

  const handleWatch = useCallback(() => {
    history.push(`/player?id=${movie.id}&type=${movie.kind}`)
  }, [history, movie])

  return (
    <div className="Movie">
      <Backdrop url={buildBackdropUrl(movie.backdropPath)} />
      <div className="Movie__details">
        <Cover url={buildCoverUrl(movie.posterPath)} alt="poster" />
        <h1>{movie.title}</h1>
        <div className="Movie__information">
          <p className="small">{new Date(movie.releaseDate).getFullYear()}</p>
          {movie.duration && (
            <p className="small">{splitHoursAndMinutes(t, movie.duration)}</p>
          )}
        </div>
        <div className="Movie__actions">
          {isInProgress(movie) && (
            <button
              className="primary"
              onClick={handleContinue}
              disabled={movie.sources.length === 0}
            >
              {t('Continue')}
            </button>
          )}
          <button
            className={classNames({ primary: !isInProgress(movie) })}
            onClick={handleWatch}
            disabled={movie.sources.length === 0}
          >
            {t('Watch')}
          </button>
          <a
            className="button"
            href={movie.trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Play trailer')}
          </a>
        </div>
        <p className="Movie__overview">{movie.summary}</p>
        <div className="Movie__people">
          <div className="Movie__people__cast">
            <h4>{t('Starring')}</h4>
            <PersonList
              people={movie.cast}
              details={(person) => person.character}
            />
          </div>
          <div className="Movie__people__crew">
            <h4>{t('Crew')}</h4>
            <PersonList people={movie.crew} details={(person) => person.job} />
          </div>
        </div>
      </div>
      <div className="Movie__sources">
        <div>
          <h4>{t('Sources')}</h4>
          <div>
            <div className="Movie__sources__versions">
              <h5>{t('Versions')}</h5>
              <FileList files={movie.sources} />
            </div>
            <div className="Movie__sources__captions">
              <h5>{t('Subtitles')}</h5>
              <FileList files={movie.captions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieView
