import { ConnectedProps, connect } from 'react-redux'
import React, { useMemo } from 'react'
import NotFound from '../NotFound'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import Show from '../../components/Show'
import { seasonsByShowSelector } from '../../store/seasons/selectors'
import { showSelector } from '../../store/shows/selectors'
import { sortByNumber } from '../../util'

const mapState = (state: RootState) => ({
  seasons: state.seasons,
  shows: state.shows,
})

const connector = connect(mapState)

interface ShowViewParams {
  id: string
}

type ShowViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<ShowViewParams>

const ShowView = ({ match, seasons, shows }: ShowViewProps) => {
  const show = useMemo(() => showSelector(match.params.id)(shows), [
    match,
    shows,
  ])

  const showSeasons = useMemo(() => {
    if (show !== undefined)
      return sortByNumber(
        seasonsByShowSelector(show.id)(seasons),
        (season) => season.number,
      )
  }, [seasons, show])

  return show !== undefined && showSeasons !== undefined ? (
    <Show show={show} seasons={showSeasons} />
  ) : (
    <NotFound />
  )
}

export default connector(ShowView)
