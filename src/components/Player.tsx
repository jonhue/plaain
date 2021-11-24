import './Player.scss'
import { Back } from './Back'
import { Episode } from '../types/items/Episode'
import { Link } from 'react-router-dom'
import { Movie } from '../types/items/Movie'
import { PlyrPlayer } from './PlyrPlayer'
import React from 'react'
import { VideoDoesNotLoadModal } from './player/VideoDoesNotLoadModal'
import { buildItemUrl } from '../util'
import { useModal } from '../hooks/modal'
import { useTranslation } from 'react-i18next'

type PlayerProps = {
  item: Movie | Episode
  startAt?: number

  onProgress: (progress: number) => void
}

export const Player = ({ item, startAt, onProgress }: PlayerProps) => {
  const { t } = useTranslation()

  const [
    showVideoDoesNotLoadModal,
    handleShowVideoDoesNotLoadModal,
    handleCloseVideoDoesNotLoadModal,
  ] = useModal()

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
          <h1>
            <Link to={buildItemUrl(item)}>{item.title}</Link>
          </h1>
          <div className="Player__content__header__actions">
            <a
              onClick={(e) => {
                e.preventDefault()
                handleShowVideoDoesNotLoadModal()
              }}
            >
              {t('Video not loading?')}
            </a>
            <VideoDoesNotLoadModal
              isActive={showVideoDoesNotLoadModal}
              onClose={handleCloseVideoDoesNotLoadModal}
            />
            <Back>
              <button className="secondary small">{t('Go back')}</button>
            </Back>
          </div>
        </div>
      </div>
    </div>
  )
}
