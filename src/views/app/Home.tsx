import { ConnectedProps, connect } from 'react-redux'
import {
  inProgressSelector,
  recentlyWatchedSelector,
} from '../../store/selectors'
import Authenticated from '../../components/get_started/Authenticated'
import ForYou from '../../components/ForYou'
import React from 'react'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import Setup from '../../components/get_started/Setup'
import Unauthenticated from '../../components/get_started/Unauthenticated'
import { index } from '../../store/thunks'
import { moviesSelector } from '../../store/movies/selectors'
import { providersSelector } from '../../store/auth/selectors'
import { showsSelector } from '../../store/shows/selectors'
import { sortByLastWatched } from '../../util'

const mapState = (state: RootState) => ({
  inProgress: sortByLastWatched(inProgressSelector(state)),
  movies: moviesSelector(state.movies),
  providers: providersSelector(state.auth),
  recentlyWatched: sortByLastWatched(recentlyWatchedSelector(state)),
  shows: showsSelector(state.shows),
})
const mapDispatch = { index }

const connector = connect(mapState, mapDispatch)

type ForYouViewProps = ConnectedProps<typeof connector> & RouteComponentProps

const ForYouView = ({
  inProgress,
  movies,
  providers,
  recentlyWatched,
  shows,
  index,
}: ForYouViewProps) =>
  inProgress.length > 0 || recentlyWatched.length > 0 ? (
    <ForYou inProgress={inProgress} recentlyWatched={recentlyWatched} />
  ) : providers.length === 0 ? (
    <Unauthenticated />
  ) : movies.length === 0 && shows.length === 0 ? (
    <Authenticated providers={providers} index={index} />
  ) : (
    <Setup movies={movies} shows={shows} />
  )

export default connector(ForYouView)
