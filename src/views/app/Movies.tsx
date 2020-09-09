import './Movies.scss'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import ItemGrid from '../../components/ItemGrid'
import VerticalSlide from '../../components/VerticalSlide'
import ZoomIcon from '../../components/Nucleo/icons/zoom.jsx'
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

type MoviesProps = ConnectedProps<typeof connector>

const Movies = ({ movies }: MoviesProps) => {
  if (movies.length === 0) return <Redirect to="/app" />

  return (
    <div className="Movies">
      <div className="Movies__find">
        <Link to="/app/find">
          <ZoomIcon width={24} height={24} />
        </Link>
      </div>
      {window.innerWidth < 600 ? (
        <VerticalSlide items={movies} path="movies" />
      ) : (
        <ItemGrid items={movies} />
      )}
    </div>
  )
}

export default connector(Movies)
