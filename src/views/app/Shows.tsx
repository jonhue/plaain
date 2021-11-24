import './Shows.scss'
import { ItemGrid } from '../../components/ItemGrid'
import { Navigate } from 'react-router-dom'
import React from 'react'
import { RootState } from '../../store'
import { VerticalSlide } from '../../components/VerticalSlide'
import { showsSelector } from '../../store/shows/selectors'
import { sortAlphabetically } from '../../util'
import { useSelector } from 'react-redux'

export const Shows = () => {
  const shows = useSelector((state: RootState) =>
    sortAlphabetically(showsSelector(state.shows), (show) => show.title),
  )

  return shows.length > 0 ? (
    <div className="Shows">
      <VerticalSlide items={shows} path="shows" id="shows" />
      <ItemGrid items={shows} />
    </div>
  ) : (
    <Navigate to="/app" />
  )
}
