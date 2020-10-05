import Back from './Back'
import { Episode } from '../types/items/Episode'
import { Movie } from '../types/items/Movie'
import PlyrPlayer from './PlyrPlayer'
import React from 'react'
import { useTranslation } from 'react-i18next'

type PlayerProps = {
  item: Movie | Episode

  onProgress: (progress: number) => void
}

const Player = ({ item, onProgress }: PlayerProps) => {
  const { t } = useTranslation()

  return (
    <div className="Player">
      <PlyrPlayer item={item} onProgress={onProgress} id="player" />
      <Back>{t('Go back')}</Back>
    </div>
  )
}

export default Player
