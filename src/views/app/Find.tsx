import { ConnectedProps, connect } from 'react-redux'
import React, { useMemo } from 'react'
import Find from '../../components/Find'
import { RootState } from '../../store'
import { useLocation } from 'react-router-dom'

const QUERY_PARAMETER = 'q'

const mapState = (state: RootState) => ({
  movies: state.movies,
  shows: state.shows,
})

const connector = connect(mapState)

type FindViewProps = ConnectedProps<typeof connector>

const FindView = ({ movies, shows }: FindViewProps) => {
  const location = useLocation()
  const query = useMemo(
    () => new URLSearchParams(location.search).get(QUERY_PARAMETER),
    [location],
  )

  return <Find movies={movies} shows={shows} query={query} />
}

export default connector(FindView)
