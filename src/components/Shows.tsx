import './Shows.scss'
import ItemGrid from './ItemGrid'
import { Link } from 'react-router-dom'
import React from 'react'
import { Show } from '../types/items/Show'
import VerticalSlide from './VerticalSlide'
import ZoomIcon from './icons/Nucleo/zoom'
import styles from '../_variables.scss'

type ShowsViewProps = {
  shows: Show[]
}

const ShowsView = ({ shows }: ShowsViewProps) => (
  <div className="Shows">
    <div className="Shows__find">
      <Link to="/app/find">
        <ZoomIcon color={styles.white} />
      </Link>
    </div>
    {window.innerWidth < Number.parseInt(styles.brPhone) ? (
      <VerticalSlide items={shows} path="shows" id="shows" />
    ) : (
      <ItemGrid items={shows} />
    )}
  </div>
)

export default ShowsView
