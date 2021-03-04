import './Movies.scss'
import { Link, Redirect } from 'react-router-dom'
import { FindIcon } from '../../components/icons/Nucleo/FindIcon'
import { ItemGrid } from '../../components/ItemGrid'
import React from 'react'
import { RootState } from '../../store'
import { VerticalSlide } from '../../components/VerticalSlide'
import { moviesSelector } from '../../store/movies/selectors'
import { sortAlphabetically } from '../../util'
import styles from '../_variables.scss'
import { useSelector } from 'react-redux'

export const Movies = () => {
  const movies = useSelector((state: RootState) =>
    sortAlphabetically(moviesSelector(state.movies), (movie) => movie.title),
  )

  return movies.length > 0 ? (
    <div className="Movies">
      <div className="Movies__find">
        <Link to="/app/find">
          <FindIcon color={styles.white} />
        </Link>
      </div>
      {window.innerWidth < Number.parseInt(styles.brPhone) ? (
        <VerticalSlide items={movies} path="movies" id="movies" />
      ) : (
        <ItemGrid items={movies} />
      )}
    </div>
  ) : (
    <Redirect to="/app" />
  )
}
