import './Show.scss'
import { buildBackdropUrl, buildCoverUrl } from '../../util'
import { Backdrop } from '../../components/Backdrop'
import { Cover } from '../../components/Cover'
import { HorizontalSlide } from '../../components/HorizontalSlide'
import { NotFound } from '../NotFound'
import React from 'react'
import { RootState } from '../../store'
import { seasonsByShowSelector } from '../../store/seasons/selectors'
import { showSelector } from '../../store/shows/selectors'
import { sortByNumber } from '../../util'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const Show = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const show = useSelector((state: RootState) => showSelector(id!)(state.shows))

  const seasons = useSelector(
    (state: RootState) =>
      show &&
      sortByNumber(
        seasonsByShowSelector(show.id)(state.seasons),
        (season) => season.number,
      ),
  )

  return show !== undefined && seasons !== undefined ? (
    <div className="Show">
      <Backdrop url={buildBackdropUrl(show.backdropPath)} />
      <div className="Show__details">
        <Cover url={buildCoverUrl(show.posterPath)} alt="poster" />
        <h1>{show.title}</h1>
        <div className="Show__information">
          {show.firstAirDate && show.lastAirDate && <p className="small">
            {new Date(show.firstAirDate).getFullYear()} -{' '}
            {new Date(show.lastAirDate).getFullYear()}
          </p>}
        </div>
        <p className="Show__overview">{show.summary}</p>
      </div>
      {seasons.length > 0 && (
        <div className="Show__seasons">
          <h2>{t('Seasons')}</h2>
          <HorizontalSlide items={seasons} id="seasons" />
        </div>
      )}
    </div>
  ) : (
    <NotFound />
  )
}
