import './Movies.scss'
import { ItemGrid } from '../../components/ItemGrid'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { RootState } from '../../store'
import { VerticalSlide } from '../../components/VerticalSlide'
import { moviesSelector } from '../../store/movies/selectors'
import { sortAlphabetically } from '../../util'
import { useSelector } from 'react-redux'

export const Movies = () => {
  const movies = useSelector((state: RootState) =>
    sortAlphabetically(moviesSelector(state.movies), (movie) => movie.title),
  )

  return movies.length > 0 ? (
    <div className="Movies">
      <VerticalSlide items={movies} path="movies" id="movies" />
      <ItemGrid items={movies} />
    </div>
  ) : (
    <Redirect to="/app" />
  )
}
