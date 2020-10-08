import { ConnectedProps, connect } from 'react-redux'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { RootState } from '../../store'
import Shows from '../../components/Shows'
import { showsSelector } from '../../store/shows/selectors'
import { sortAlphabetically } from '../../util'

const mapState = (state: RootState) => ({
  shows: sortAlphabetically(showsSelector(state.shows), (show) => show.title),
})

const connector = connect(mapState)

type ShowsViewProps = ConnectedProps<typeof connector>

const ShowsView = ({ shows }: ShowsViewProps) =>
  shows.length > 0 ? <Shows shows={shows} /> : <Redirect to="/app" />

export default connector(ShowsView)
