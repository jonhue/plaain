import './Shows.scss'
import { Link, Redirect } from 'react-router-dom'
import { FindIcon } from '../../components/icons/Nucleo/FindIcon'
import { ItemGrid } from '../../components/ItemGrid'
import React from 'react'
import { RootState } from '../../store'
import { VerticalSlide } from '../../components/VerticalSlide'
import { showsSelector } from '../../store/shows/selectors'
import { sortAlphabetically } from '../../util'
import styles from '../../_variables.scss'
import { useSelector } from 'react-redux'

export const Shows = () => {
  const shows = useSelector((state: RootState) =>
    sortAlphabetically(showsSelector(state.shows), (show) => show.title),
  )

  return shows.length > 0 ? (
    <div className="Shows">
      <div className="Shows__find">
        <Link to="/app/find">
          <FindIcon color={styles.white} />
        </Link>
      </div>
      {window.innerWidth < Number.parseInt(styles.brPhone) ? (
        <VerticalSlide items={shows} path="shows" id="shows" />
      ) : (
        <ItemGrid items={shows} />
      )}
    </div>
  ) : (
    <Redirect to="/app" />
  )
}
