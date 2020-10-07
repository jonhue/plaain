import { ConnectedProps, connect } from 'react-redux'
import React, { useCallback, useMemo } from 'react'
import { Redirect, useLocation } from 'react-router'
import { ItemKind } from '../types/items/Item'
import Player from '../components/Player'
import { RootState } from '../store'
import { episodeSelector } from '../store/episodes/selectors'
import { movieSelector } from '../store/movies/selectors'
import { updateEpisodeProgress } from '../store/episodes/thunks'
import { updateMovieProgress } from '../store/movies/thunks'

const KIND_PARAMETER = 'type'
const ID_PARAMETER = 'id'

const mapState = (state: RootState) => ({
  episodes: state.episodes,
  movies: state.movies,
})
const mapDispatch = { updateEpisodeProgress, updateMovieProgress }

const connector = connect(mapState, mapDispatch)

type PlayerViewProps = ConnectedProps<typeof connector>

const PlayerView = ({
  episodes,
  movies,
  updateEpisodeProgress,
  updateMovieProgress,
}: PlayerViewProps) => {
  const location = useLocation()

  const kind: ItemKind | undefined = useMemo(() => {
    const rawKind = new URLSearchParams(location.search).get(KIND_PARAMETER)
    if (rawKind === null) return

    const kind = Number.parseInt(rawKind)

    if (Object.values(ItemKind).includes(kind)) return kind
  }, [location])

  const item = useMemo(() => {
    const id = new URLSearchParams(location.search).get(ID_PARAMETER)
    if (id === null) return

    switch (kind) {
      case ItemKind.Episode:
        return episodeSelector(id)(episodes)
      case ItemKind.Movie:
        return movieSelector(id)(movies)
    }
  }, [episodes, kind, location, movies])

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

  return item !== undefined && item.sources.length > 0 ? (
    <Player item={item} onProgress={handleProgress} />
  ) : (
    <Redirect to="/app" />
  )
}

export default connector(PlayerView)
