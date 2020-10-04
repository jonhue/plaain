import './Show.scss'
import { ConnectedProps, connect } from 'react-redux'
import { buildBackdropUrl, buildCoverUrl, sortByNumber } from '../../util'
import Backdrop from '../../components/Backdrop'
import Cover from '../../components/Cover'
import HorizontalSlide from '../../components/HorizontalSlide'
import NotFound from '../NotFound'
import React from 'react'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import { seasonsByShowSelector } from '../../store/seasons/selectors'
import { showSelector } from '../../store/shows/selectors'
import { useTranslation } from 'react-i18next'

const mapState = (state: RootState) => ({
  seasons: state.seasons,
  shows: state.shows,
})

const connector = connect(mapState)

interface ShowParams {
  id: string
}

type ShowProps = ConnectedProps<typeof connector> &
  RouteComponentProps<ShowParams>

const Show = ({ match, seasons, shows }: ShowProps) => {
  const { t } = useTranslation()

  const show = showSelector(match.params.id)(shows)
  if (show === undefined) return <NotFound />

  const showSeasons = sortByNumber(
    seasonsByShowSelector(show.id)(seasons),
    (season) => season.number,
  )
  const firstAirDate = showSeasons[0].airDate
  const lastAirDate = showSeasons[showSeasons.length - 1].airDate

  return (
    <div className="Show">
      <Backdrop url={buildBackdropUrl(show.backdropPath)} />
      <div className="Show__details">
        <Cover url={buildCoverUrl(show.posterPath)} alt="poster" width="50%" />
        <h1>{show.title}</h1>
        <div className="Show__information">
          <p className="small">
            {firstAirDate.getFullYear()} - {lastAirDate.getFullYear()}
          </p>
        </div>
        <p className="Show__overview">{show.summary}</p>
      </div>
      {showSeasons.length > 0 && (
        <div className="Show__seasons">
          <h2>{t('Seasons')}</h2>
          <HorizontalSlide items={showSeasons} />
        </div>
      )}
    </div>
  )
}

export default connector(Show)
