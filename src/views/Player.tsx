import { ConnectedProps, connect } from 'react-redux'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ItemKind } from '../types/items/Item'
import Loading from './Loading'
import NotFound from './NotFound'
import Player from '../components/Player'
import { RootState } from '../store'
import { episodeSelector } from '../store/episodes/selectors'
import { load } from '../store/ui/thunks'
import { movieSelector } from '../store/movies/selectors'
import { updateEpisodeProgress } from '../store/episodes/thunks'
import { updateFile } from '../store/thunks'
import { updateMovieProgress } from '../store/movies/thunks'
import { useLocation } from 'react-router'

const KIND_PARAMETER = 'type'
const ID_PARAMETER = 'id'

const mapState = (state: RootState) => ({
  episodes: state.episodes,
  movies: state.movies,
})
const mapDispatch = { load, updateEpisodeProgress, updateMovieProgress }

const connector = connect(mapState, mapDispatch)

type PlayerViewProps = ConnectedProps<typeof connector>

const PlayerView = ({
  episodes,
  movies,
  load,
  updateEpisodeProgress,
  updateMovieProgress,
}: PlayerViewProps) => {
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    if (item === undefined) {
      setIsLoading(false)
      return
    }

    Promise.all([
      ...item.sources.map((source) => load(updateFile(source))),
      ...item.captions.map((caption) => load(updateFile(caption))),
    ]).then(() => setIsLoading(false))
  }, [load, item, setIsLoading])

  return isLoading ? (
    <Loading />
  ) : item !== undefined && item.sources.length > 0 ? (
    <Player item={item} onProgress={handleProgress} />
  ) : (
    <NotFound />
  )
}

export default connector(PlayerView)
