import './Shows.scss'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import ItemGrid from '../../components/ItemGrid'
import VerticalSlide from '../../components/VerticalSlide'
import ZoomIcon from '../../components/Nucleo/icons/zoom.jsx'
import { sortAlphabetically } from '../../util'
import { showsSelector } from '../../store/shows/selectors'
import { RootState } from '../../store'

const mapState = (state: RootState) => ({
  shows: sortAlphabetically(showsSelector(state.shows), (show) => show.title),
})

const connector = connect(mapState)

type ShowsProps = ConnectedProps<typeof connector>

const Shows = ({ shows }: ShowsProps) => {
  if (shows.length === 0) return <Redirect to="/app" />

  return (
    <div className="Shows">
      <div className="Shows__find">
        <Link to="/app/find">
          <ZoomIcon width={24} height={24} />
        </Link>
      </div>
      {window.innerWidth < 600 ? (
        <VerticalSlide items={shows} path="shows" />
      ) : (
        <ItemGrid items={shows} />
      )}
    </div>
  )
}

export default connector(Shows)
