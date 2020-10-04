import './Show.scss'
import { buildBackdropUrl, buildCoverUrl } from '../util'
import Backdrop from './Backdrop'
import Cover from './Cover'
import HorizontalSlide from './HorizontalSlide'
import React from 'react'
import { Season } from '../types/items/Season'
import { Show } from '../types/items/Show'
import { useTranslation } from 'react-i18next'

type ShowProps = {
  show: Show
  seasons: Season[]
}

const Show = ({ show, seasons }: ShowProps) => {
  const { t } = useTranslation()

  return (
    <div className="Show">
      <Backdrop url={buildBackdropUrl(show.backdropPath)} />
      <div className="Show__details">
        <Cover url={buildCoverUrl(show.posterPath)} alt="poster" width="50%" />
        <h1>{show.title}</h1>
        <div className="Show__information">
          <p className="small">
            {show.firstAirDate.getFullYear()} - {show.lastAirDate.getFullYear()}
          </p>
        </div>
        <p className="Show__overview">{show.summary}</p>
      </div>
      {seasons.length > 0 && (
        <div className="Show__seasons">
          <h2>{t('Seasons')}</h2>
          <HorizontalSlide items={seasons} />
        </div>
      )}
    </div>
  )
}

export default Show
