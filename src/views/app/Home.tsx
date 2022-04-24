import { AppDispatch, RootState } from '../../store'
import React, { useCallback } from 'react'
import {
  inProgressSelector,
  recentlyWatchedSelector,
} from '../../store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { Authenticated } from '../../components/get_started/Authenticated'
import { ForYou } from '../../components/ForYou'
import { Setup } from '../../components/get_started/Setup'
import { Unauthenticated } from '../../components/get_started/Unauthenticated'
import { index } from '../../store/thunks'
import { load } from '../../store/ui/thunks'
import { moviesSelector } from '../../store/movies/selectors'
import { providersSelector } from '../../store/auth/selectors'
import { showsSelector } from '../../store/shows/selectors'
import { sortByLastWatched } from '../../util'

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { inProgress, movies, providers, recentlyWatched, shows } = useSelector(
    (state: RootState) => ({
      inProgress: sortByLastWatched(inProgressSelector(state)),
      movies: moviesSelector(state.movies),
      providers: providersSelector(state.auth),
      recentlyWatched: sortByLastWatched(recentlyWatchedSelector(state)),
      shows: showsSelector(state.shows),
    }),
  )

  const handleIndex = useCallback(() => {
    dispatch(load(index(providers)))
  }, [dispatch, providers])

  return inProgress.length > 0 || recentlyWatched.length > 0 ? (
    <ForYou inProgress={inProgress} recentlyWatched={recentlyWatched} />
  ) : providers.length === 0 ? (
    <Unauthenticated />
  ) : movies.length === 0 && shows.length === 0 ? (
    <Authenticated onIndex={handleIndex} />
  ) : (
    <Setup movies={movies} shows={shows} />
  )
}
