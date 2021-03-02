import Movies from '../../components/Movies'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { RootState } from '../../store'
import { moviesSelector } from '../../store/movies/selectors'
import { sortAlphabetically } from '../../util'
import { useSelector } from 'react-redux'

const MoviesView = () => {
  const movies = useSelector((state: RootState) =>
    sortAlphabetically(moviesSelector(state.movies), (movie) => movie.title),
  )

  return movies.length > 0 ? <Movies movies={movies} /> : <Redirect to="/app" />
}

export default MoviesView
