import { ConnectedProps, connect } from 'react-redux'
import Movies from '../../components/Movies'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { RootState } from '../../store'
import { moviesSelector } from '../../store/movies/selectors'
import { sortAlphabetically } from '../../util'

const mapState = (state: RootState) => ({
  movies: sortAlphabetically(
    moviesSelector(state.movies),
    (movie) => movie.title,
  ),
})

const connector = connect(mapState)

type MoviesViewProps = ConnectedProps<typeof connector>

const MoviesView = ({ movies }: MoviesViewProps) =>
  movies.length > 0 ? <Movies movies={movies} /> : <Redirect to="/app" />

export default connector(MoviesView)
