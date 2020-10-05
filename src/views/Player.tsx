import { ConnectedProps, connect } from 'react-redux'
import React, { useCallback, useMemo } from 'react'
import { Redirect, RouteComponentProps } from 'react-router'
import { ItemKind } from '../types/items/Item'
import Player from '../components/Player'
import { RootState } from '../store'
import { episodeSelector } from '../store/episodes/selectors'
import { movieSelector } from '../store/movies/selectors'
import { updateEpisodeProgress } from '../store/episodes/thunks'
import { updateMovieProgress } from '../store/movies/thunks'

const mapState = (state: RootState) => ({
  episodes: state.episodes,
  movies: state.movies,
})
const mapDispatch = { updateEpisodeProgress, updateMovieProgress }

const connector = connect(mapState, mapDispatch)

interface PlayerViewParams {
  id: string
  type: string
}

type PlayerViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<PlayerViewParams>

const PlayerView = ({
  match,
  episodes,
  movies,
  updateEpisodeProgress,
  updateMovieProgress,
}: PlayerViewProps) => {
  const kind = useMemo(() => {
    const kind = Number.parseInt(match.params.type)

    if (kind in ItemKind) return kind
  }, [match])

  const item = useMemo(() => {
    switch (kind) {
      case ItemKind.Episode:
        return episodeSelector(match.params.id)(episodes)
      case ItemKind.Movie:
        return movieSelector(match.params.id)(movies)
    }
  }, [kind, match, movies])

  const handleProgress = useCallback(
    (progress: number) => {
      if (item === undefined) return

      switch (item.kind) {
        case ItemKind.Episode:
          return updateEpisodeProgress(item, progress)
        case ItemKind.Movie:
          return updateMovieProgress(item, progress)
      }
    },
    [item, updateEpisodeProgress, updateMovieProgress],
  )

  return item !== undefined ? (
    <Player item={item} onProgress={handleProgress} />
  ) : (
    <Redirect to="/app" />
  )
}

export default PlayerView
