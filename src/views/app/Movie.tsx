import './Movie.scss'
import React, { useCallback } from 'react'
import {
  buildBackdropUrl,
  buildCoverUrl,
  buildJobTitle,
  isInProgress,
  splitHoursAndMinutes,
} from '../../util'
import { useNavigate, useParams } from 'react-router-dom'
import { Backdrop } from '../../components/Backdrop'
import { Cover } from '../../components/Cover'
import { FileList } from '../../components/FileList'
import { NotFound } from '../NotFound'
import { PersonList } from '../../components/PersonList'
import { RootState } from '../../store'
import classNames from 'classnames'
import { movieSelector } from '../../store/movies/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const Movie = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()

  const movie = useSelector((state: RootState) =>
    movieSelector(id!)(state.movies),
  )

  const handleContinue = useCallback(() => {
    if (movie === undefined) return
    navigate(
      `/player?id=${movie.id}&type=${movie.kind}&s=${movie.usage.progress}`,
    )
  }, [movie, navigate])

  const handleWatch = useCallback(() => {
    if (movie === undefined) return
    navigate(`/player?id=${movie.id}&type=${movie.kind}`)
  }, [movie, navigate])

  return movie !== undefined ? (
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
            <PersonList
              people={movie.crew}
              details={(person) => buildJobTitle(t, person.job, person.gender)}
            />
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
  ) : (
    <NotFound />
  )
}
