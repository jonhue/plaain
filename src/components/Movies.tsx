import './Movies.scss'
import ItemGrid from './ItemGrid'
import { Link } from 'react-router-dom'
import { Movie } from '../types/items/Movie'
import React from 'react'
import VerticalSlide from './VerticalSlide'
import ZoomIcon from './icons/Nucleo/zoom'
import styles from '../_variables.scss'

type MoviesViewProps = {
  movies: Movie[]
}

const MoviesView = ({ movies }: MoviesViewProps) => (
  <div className="Movies">
    <div className="Movies__find">
      <Link to="/app/find">
        <ZoomIcon color={styles.white} />
      </Link>
    </div>
    {window.innerWidth < Number.parseInt(styles.brPhone) ? (
      <VerticalSlide items={movies} path="movies" id="movies" />
    ) : (
      <ItemGrid items={movies} />
    )}
  </div>
)

export default MoviesView
