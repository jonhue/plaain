import NotFound from '../NotFound'
import React from 'react'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import Show from '../../components/Show'
import { seasonsByShowSelector } from '../../store/seasons/selectors'
import { showSelector } from '../../store/shows/selectors'
import { sortByNumber } from '../../util'
import { useSelector } from 'react-redux'

interface ShowViewParams {
  id: string
}

type ShowViewProps = RouteComponentProps<ShowViewParams>

const ShowView = ({ match }: ShowViewProps) => {
  const show = useSelector((state: RootState) =>
    showSelector(match.params.id)(state.shows),
  )

  const showSeasons = useSelector(
    (state: RootState) =>
      show &&
      sortByNumber(
        seasonsByShowSelector(show.id)(state.seasons),
        (season) => season.number,
      ),
  )

  return show !== undefined && showSeasons !== undefined ? (
    <Show show={show} seasons={showSeasons} />
  ) : (
    <NotFound />
  )
}

export default ShowView
