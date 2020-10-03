import './Movie.scss'
import { ConnectedProps, connect } from 'react-redux'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { isInProgress, splitHoursAndMinutes } from '../../util'
import Backdrop from '../../components/Backdrop'
import Cover from '../../components/Cover'
import FileList from '../../components/FileList'
import NotFound from '../NotFound'
import PersonList from '../../components/PersonList'
import React from 'react'
import { RootState } from '../../store'
import classNames from 'classnames'
import { movieSelector } from '../../store/movies/selectors'

const mapState = (state: RootState) => ({
  movies: state.movies,
})

const connector = connect(mapState)

interface MovieParams {
  id: string
}

type MovieProps = ConnectedProps<typeof connector> &
  RouteComponentProps<MovieParams>

const Movie = ({ match, movies }: MovieProps) => {
  const movie = movieSelector(match.params.id)(movies)
  if (movie === undefined) return <NotFound />

  const history = useHistory()

  const handleContinue = () => {
    history.push(
      `/player?id=${movie.id}&type=${movie.kind}&s=${movie.progress}`,
    )
  }

  const handleWatch = () => {
    history.push(`/player?id=${movie.id}&type=${movie.kind}`)
  }

  return (
    <div className="Movie">
      <Backdrop url={movie.backdropUrl} />
      <div className="Movie__details">
        <Cover url={movie.posterUrl} alt="poster" width="50%" />
        <h1>{movie.title}</h1>
        <div className="Movie__information">
          <p className="small">{movie.releaseDate.getFullYear()}</p>
          <p className="small">{splitHoursAndMinutes(movie.duration)}</p>
        </div>
        <div className="Movie__actions">
          {isInProgress(movie) && (
            <button
              className="primary"
              onClick={handleContinue}
              disabled={movie.sources.length === 0}
            >
              Continue
            </button>
          )}
          <button
            className={classNames({ primary: !isInProgress(movie) })}
            onClick={handleWatch}
            disabled={movie.sources.length === 0}
          >
            Watch
          </button>
          <a
            className="button"
            href={movie.trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Play trailer
          </a>
        </div>
        <p className="Movie__overview">{movie.summary}</p>
        <div className="Movie__people">
          <div className="Movie__people__cast">
            <h4>Starring</h4>
            <PersonList people={movie.cast} attribute="character" />
          </div>
          <div className="Movie__people__crew">
            <h4>Crew</h4>
            <PersonList people={movie.crew} attribute="job" />
          </div>
        </div>
      </div>
      <div className="Movie__sources">
        <div>
          <h4>Sources</h4>
          <div>
            <div className="Movie__sources__versions">
              <h5>Versions</h5>
              <FileList files={movie.sources} />
            </div>
            <div className="Movie__sources__captions">
              <h5>Subtitles</h5>
              <FileList files={movie.captions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connector(Movie)
