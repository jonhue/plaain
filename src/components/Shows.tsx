import './Shows.scss'
import ItemGrid from './ItemGrid'
import { Link } from 'react-router-dom'
import React from 'react'
import { Show } from '../types/items/Show'
import VerticalSlide from './VerticalSlide'
import ZoomIcon from './icons/Nucleo/zoom.js'
import styles from '../_variables.scss'

type ShowsProps = {
  shows: Show[]
}

const Shows = ({ shows }: ShowsProps) => (
  <div className="Shows">
    <div className="Shows__find">
      <Link to="/app/find">
        <ZoomIcon color={styles.white} />
      </Link>
    </div>
    {window.innerWidth < styles.brPhone ? (
      <VerticalSlide items={shows} path="shows" />
    ) : (
      <ItemGrid items={shows} />
    )}
  </div>
)

export default Shows
