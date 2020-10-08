import { ConnectedProps, connect } from 'react-redux'
import React, { useMemo } from 'react'
import Movie from '../../components/Movie'
import NotFound from '../NotFound'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import { movieSelector } from '../../store/movies/selectors'

const mapState = (state: RootState) => ({
  movies: state.movies,
})

const connector = connect(mapState)

interface MovieViewParams {
  id: string
}

type MovieViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<MovieViewParams>

const MovieView = ({ match, movies }: MovieViewProps) => {
  const movie = useMemo(() => movieSelector(match.params.id)(movies), [
    match,
    movies,
  ])

  return movie !== undefined ? <Movie movie={movie} /> : <NotFound />
}

export default connector(MovieView)
