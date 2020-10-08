import './Season.scss'
import React, { useCallback, useState } from 'react'
import { buildBackdropUrl, buildCoverUrl } from '../util'
import Backdrop from './Backdrop'
import Cover from './Cover'
import { Episode } from '../types/items/Episode'
import EpisodeEntry from './EpisodeEntry'
import PersonList from './PersonList'
import { Season } from '../types/items/Season'
import { Show } from '../types/items/Show'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type SeasonViewProps = {
  show: Show
  season: Season
  episodes: Episode[]
  currentEpisode: Episode | undefined
}

const SeasonView = ({
  show,
  season,
  episodes,
  currentEpisode,
}: SeasonViewProps) => {
  const { t } = useTranslation()
  const history = useHistory()

  const [showEpisodes, setShowEpisodes] = useState(false)
  const toggleEpisodes = useCallback(() => setShowEpisodes((state) => !state), [
    setShowEpisodes,
  ])

  const handleContinue = useCallback(
    (episode: Episode) => () => {
      history.push(
        `/player?id=${episode.id}&type=${episode.kind}&s=${episode.usage.progress}`,
      )
    },
    [history],
  )

  const handleWatch = useCallback(
    (episodeNumber: number) => () => {
      const episode = episodes.find(
        (episode) => episode.number === episodeNumber,
      )!

      history.push(`/player?id=${episode.id}&type=${episode.kind}`)
    },
    [episodes, history],
  )

  return (
    <div className="Season">
      <Backdrop url={buildBackdropUrl(season.showBackdropPath)} />
      <div className="Season__details">
        <Cover url={buildCoverUrl(season.posterPath)} alt="poster" />
        <h1>
          {t('Season')} {season.number}
        </h1>
        <div className="Season__information">
          <p className="small">{show.title}</p>
          <p className="small">{new Date(season.airDate).getFullYear()}</p>
        </div>
        <div className="Season__actions">
          {currentEpisode !== undefined && (
            <button
              className="primary"
              onClick={handleContinue(currentEpisode)}
              disabled={currentEpisode.sources.length === 0}
            >
              {t('Continue episode')} {currentEpisode.number}
            </button>
          )}
          {episodes.length > 0 && (
            <button
              className={classNames({ primary: currentEpisode === undefined })}
              onClick={handleWatch(0)}
              disabled={episodes[0].sources.length === 0}
            >
              {t('Watch')}
            </button>
          )}
          <a
            className="button"
            id="trailer"
            href={season.trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Play trailer')}
          </a>
        </div>
        <div className="Season__episodes">
          <div
            className={classNames('Season__episodes__list', {
              shown: showEpisodes,
            })}
          >
            {episodes
              .slice(0, showEpisodes ? episodes.length : 0)
              .map((episode, index) => (
                <EpisodeEntry
                  episode={episode}
                  onClick={handleWatch(episode.number)}
                  key={index}
                />
              ))}
          </div>
          {episodes.length > 0 && (
            <div className="Season__episodes__toggle" onClick={toggleEpisodes}>
              {showEpisodes ? t('Hide episodes') : t('Show all episodes')}
            </div>
          )}
        </div>
        <p className="Season__overview">{season.summary}</p>
        <div className="Season__people">
          <div className="Season__people__cast">
            <h4>{t('Starring')}</h4>
            <PersonList
              people={season.cast}
              details={(person) => person.character}
            />
          </div>
          <div className="Season__people__crew">
            <h4>{t('Crew')}</h4>
            <PersonList people={season.crew} details={(person) => person.job} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonView
