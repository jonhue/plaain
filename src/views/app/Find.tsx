import { ConnectedProps, connect } from 'react-redux'
import Find from '../../components/Find'
import React from 'react'
import { RootState } from '../../store'
import { moviesSelector } from '../../store/movies/selectors'
import { showsSelector } from '../../store/shows/selectors'

const mapState = (state: RootState) => ({
  movies: moviesSelector(state.movies),
  shows: showsSelector(state.shows),
})

const connector = connect(mapState)

type FindViewProps = ConnectedProps<typeof connector>

const FindView = ({ movies, shows }: FindViewProps) => (
  <Find movies={movies} shows={shows} />
)

export default connector(FindView)
