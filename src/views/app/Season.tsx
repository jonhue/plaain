import './Season.scss'
import { ConnectedProps, connect } from 'react-redux'
import React, { useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import Backdrop from '../../components/Backdrop'
import Cover from '../../components/Cover'
import NotFound from '../NotFound'
import PersonList from '../../components/PersonList'
import { RootState } from '../../store'
import classNames from 'classnames'
import { episodesBySeasonSelector } from '../../store/episodes/selectors'
import { seasonSelector } from '../../store/seasons/selectors'
import { showSelector } from '../../store/shows/selectors'
import { sortByNumber } from '../../util'

const mapState = (state: RootState) => ({
  episodes: state.episodes,
  seasons: state.seasons,
  shows: state.shows,
})

const connector = connect(mapState)

interface SeasonParams {
  id: string
}

type SeasonProps = ConnectedProps<typeof connector> &
  RouteComponentProps<SeasonParams>

const Season = ({ episodes, match, seasons, shows }: SeasonProps) => {
  const season = seasonSelector(match.params.id)(seasons)
  if (season === undefined) return <NotFound />

  const show = showSelector(season.showId)(shows)
  if (show === undefined) return <NotFound />

  const seasonEpisodes = sortByNumber(
    episodesBySeasonSelector(season.id)(episodes),
    (episode) => episode.number,
  )
  const currentEpisode = seasonEpisodes.find(
    (episode) => episode.number === season.progress,
  )

  const history = useHistory()

  const handleContinue = () => {
    const episode = currentEpisode!

    history.push(
      `/player?id=${episode.id}&type=${episode.kind}&s=${episode.progress}`,
    )
  }

  const handleWatch = (episodeNumber: number) => () => {
    const episode = seasonEpisodes.find(
      (episode) => episode.number === episodeNumber,
    )!

    history.push(`/player?id=${episode.id}&type=${episode.kind}`)
  }

  const [showEpisodes, setShowEpisodes] = useState(false)
  const toggleEpisodes = () => setShowEpisodes(!showEpisodes)

  return (
    <div className="Season">
      <Backdrop url={season.backdropUrl} />
      <div className="Season__details">
        <Cover url={season.posterUrl} alt="poster" width="50%" />
        <h1>Season {season.number}</h1>
        <div className="Season__information">
          <p className="small">{show.title}</p>
          <p className="small">{season.airDate.getFullYear()}</p>
        </div>
        <div className="Season__actions">
          {currentEpisode !== undefined && (
            <button
              className="primary"
              onClick={handleContinue}
              disabled={currentEpisode.sources.length === 0}
            >
              Continue episode {currentEpisode.number}
            </button>
          )}
          {seasonEpisodes.length > 0 && (
            <button
              className={classNames({ primary: currentEpisode === undefined })}
              onClick={handleWatch(0)}
              disabled={seasonEpisodes[0].sources.length === 0}
            >
              Watch
            </button>
          )}
          <a
            className="button"
            id="trailer"
            href={season.trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Play trailer
          </a>
        </div>
        <div className="Season__episodes">
          <div>
            {seasonEpisodes
              .slice(0, showEpisodes ? seasonEpisodes.length : 0)
              .map((episode, index) => (
                <button
                  className="Season__episode"
                  onClick={handleWatch(episode.number)}
                  disabled={episode.sources.length === 0}
                  key={index}
                >
                  <div className="Season__episode__number">
                    {episode.number}
                  </div>
                  <div className="Season__episode__details">
                    <h2>{episode.title}</h2>
                    <p className="small">
                      Aired {episode.airDate.toDateString()}
                    </p>
                    <p>{episode.summary}</p>
                  </div>
                </button>
              ))}
          </div>
          {seasonEpisodes.length > 0 && (
            <span onClick={toggleEpisodes}>
              {showEpisodes ? 'Show all episodes' : 'Hide episodes'}
            </span>
          )}
        </div>
        <p className="Season__overview">{season.summary}</p>
        <div className="Season__people">
          <div className="Season__people__cast">
            <h4>Starring</h4>
            <PersonList people={season.cast} attribute="character" />
          </div>
          <div className="Season__people__crew">
            <h4>Crew</h4>
            <PersonList people={season.crew} attribute="job" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default connector(Season)
