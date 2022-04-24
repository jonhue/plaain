import './EpisodeEntry.scss'
import { Episode } from '../types/items/Episode'
import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

type EpisodeEntryProps = {
  episode: Episode

  onClick: () => void
}

export const EpisodeEntry = ({ episode, onClick }: EpisodeEntryProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={classNames('EpisodeEntry', {
        disabled: episode.sources.length === 0,
      })}
      onClick={onClick}
    >
      <div className="EpisodeEntry__number">{episode.number}</div>
      <div className="EpisodeEntry__details">
        <h2>{episode.title}</h2>
        {episode.airDate && (
          <p className="small">
            {t('Aired')} {new Date(episode.airDate).toDateString()}
          </p>
        )}
        <p>{episode.summary}</p>
      </div>
    </div>
  )
}
