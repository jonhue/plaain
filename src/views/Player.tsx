import { AppDispatch, RootState } from '../store'
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemKind } from '../types/items/Item'
import { Loading } from './Loading'
import { NotFound } from './NotFound'
import { Player } from '../components/Player'
import { episodeSelector } from '../store/episodes/selectors'
import { load } from '../store/ui/thunks'
import { movieSelector } from '../store/movies/selectors'
import { updateEpisodeProgress } from '../store/episodes/thunks'
import { updateFiles } from '../store/thunks'
import { updateMovieProgress } from '../store/movies/thunks'
import { useAsyncMemo } from 'use-async-memo'
import { useLocation } from 'react-router'

const KIND_PARAMETER = 'type'
const ID_PARAMETER = 'id'
const START_AT_PARAMETER = 's'

const PlayerView = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()

  const { episodes, movies } = useSelector((state: RootState) => ({
    episodes: state.episodes,
    movies: state.movies,
  }))

  const [isNotFound, setIsNotFound] = useState(false)

  const startAt: number | undefined = useMemo(() => {
    const rawStartAt = new URLSearchParams(location.search).get(
      START_AT_PARAMETER,
    )
    if (rawStartAt === null) return

    return Number.parseInt(rawStartAt)
  }, [location])

  const kind: ItemKind | undefined = useMemo(() => {
    const rawKind = new URLSearchParams(location.search).get(KIND_PARAMETER)
    if (rawKind === null) return

    const kind = Number.parseInt(rawKind)

    if (Object.values(ItemKind).includes(kind)) return kind
  }, [location])

  const findItem = useCallback(
    (kind: ItemKind, id: string) => {
      switch (kind) {
        case ItemKind.Episode:
          return episodeSelector(id)(episodes)
        case ItemKind.Movie:
          return movieSelector(id)(movies)
      }
    },
    [episodes, movies],
  )

  const item = useAsyncMemo(async () => {
    if (kind === undefined) return setIsNotFound(true)

    const id = new URLSearchParams(location.search).get(ID_PARAMETER)
    if (id === null) return setIsNotFound(true)

    const item = findItem(kind, id)
    if (item === undefined) return setIsNotFound(true)

    const updatedItem = await dispatch(load(updateFiles(item)))
    return updatedItem
  }, [dispatch, kind, location, setIsNotFound])

  const handleProgress = useCallback(
    (progress: number) => {
      if (item === undefined) return

      switch (item.kind) {
        case ItemKind.Episode:
          return dispatch(updateEpisodeProgress(item, progress))
        case ItemKind.Movie:
          return dispatch(updateMovieProgress(item, progress))
      }
    },
    [dispatch, item],
  )

  return item !== undefined && item.sources.length > 0 ? (
    <Player item={item} startAt={startAt} onProgress={handleProgress} />
  ) : isNotFound ? (
    <NotFound />
  ) : (
    <Loading />
  )
}

export default PlayerView
