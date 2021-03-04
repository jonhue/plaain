import './Season.scss'
import React, { useCallback, useMemo, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { buildBackdropUrl, buildCoverUrl, sortByNumber } from '../../util'
import { Backdrop } from '../../components/Backdrop'
import { Cover } from '../../components/Cover'
import { Episode } from '../../types/items/Episode'
import { EpisodeEntry } from '../../components/EpisodeEntry'
import { NotFound } from '../NotFound'
import { PersonList } from '../../components/PersonList'
import { RootState } from '../../store'
import classNames from 'classnames'
import { episodesBySeasonSelector } from '../../store/episodes/selectors'
import { seasonSelector } from '../../store/seasons/selectors'
import { showSelector } from '../../store/shows/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface SeasonParams {
  id: string
}

type SeasonProps = RouteComponentProps<SeasonParams>

export const Season = ({ match }: SeasonProps) => {
  const { t } = useTranslation()
  const history = useHistory()

  const season = useSelector((state: RootState) =>
    seasonSelector(match.params.id)(state.seasons),
  )
  const { show, episodes } = useSelector((state: RootState) => ({
    show: season && showSelector(season.showId)(state.shows),
    episodes:
      season &&
      sortByNumber(
        episodesBySeasonSelector(season.id)(state.episodes),
        (episode) => episode.number,
      ),
  }))
  const currentEpisode = useMemo(() => {
    if (season !== undefined && episodes !== undefined)
      return episodes.find(
        (episode) => episode.number === season.usage.progress,
      )
  }, [season, episodes])

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
      if (episodes === undefined) return

      const episode = episodes.find(
        (episode) => episode.number === episodeNumber,
      )!

      history.push(`/player?id=${episode.id}&type=${episode.kind}`)
    },
    [episodes, history],
  )

  return show !== undefined &&
    season !== undefined &&
    episodes !== undefined ? (
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
  ) : (
    <NotFound />
  )
}
