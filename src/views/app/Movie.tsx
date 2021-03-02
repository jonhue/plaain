import Movie from '../../components/Movie'
import NotFound from '../NotFound'
import React from 'react'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import { movieSelector } from '../../store/movies/selectors'
import { useSelector } from 'react-redux'

interface MovieViewParams {
  id: string
}

type MovieViewProps = RouteComponentProps<MovieViewParams>

const MovieView = ({ match }: MovieViewProps) => {
  const movie = useSelector((state: RootState) =>
    movieSelector(match.params.id)(state.movies),
  )

  return movie !== undefined ? <Movie movie={movie} /> : <NotFound />
}

export default MovieView
