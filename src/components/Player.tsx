import './Player.scss'
import React, { useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Back from './Back'
import { Episode } from '../types/items/Episode'
import { Movie } from '../types/items/Movie'
import PlyrPlayer from './PlyrPlayer'

type PlayerProps = {
  item: Movie | Episode
  startAt?: number

  onProgress: (progress: number) => void
}

const Player = ({ item, startAt, onProgress }: PlayerProps) => {
  const { t } = useTranslation()

  const handleReload = useCallback(() => window.location.reload(), [])

  return (
    <div className="Player">
      <PlyrPlayer
        item={item}
        startAt={startAt}
        onProgress={onProgress}
        id="player"
      />
      <div className="Player__content">
        <div className="Player__content__header">
          <h1>{item.title}</h1>
          <Back>
            <button className="secondary">{t('Go back')}</button>
          </Back>
        </div>
        <div className="Player__content__reload">
          <p className="small">
            <Trans>
              The video doesn&apos;t load? Restarting may help. Please{' '}
              <a
                href="https://github.com/jonhue/plaain/issues/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                report the issue
              </a>{' '}
              if it persists.
            </Trans>
          </p>
          <button onClick={handleReload}>{t('Reload')}</button>
        </div>
      </div>
    </div>
  )
}

export default Player
