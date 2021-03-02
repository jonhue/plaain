import React from 'react'
import { Redirect } from 'react-router-dom'
import { RootState } from '../../store'
import Shows from '../../components/Shows'
import { showsSelector } from '../../store/shows/selectors'
import { sortAlphabetically } from '../../util'
import { useSelector } from 'react-redux'

const ShowsView = () => {
  const shows = useSelector((state: RootState) =>
    sortAlphabetically(showsSelector(state.shows), (show) => show.title),
  )

  return shows.length > 0 ? <Shows shows={shows} /> : <Redirect to="/app" />
}

export default ShowsView
