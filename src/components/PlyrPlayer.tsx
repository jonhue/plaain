import './PlyrPlayer.scss'
import React, { useEffect, useMemo } from 'react'
import {
  buildCaptionSrcLang,
  buildFileDownloadUrl,
  buildVideoSize,
} from '../util'
import { Caption } from '../types/files/captions/Caption'
import { Episode } from '../types/items/Episode'
import { ItemKind } from '../types/items/Item'
import { Movie } from '../types/items/Movie'
import Plyr from 'plyr'
import { Video } from '../types/files/videos/Video'

const buildSource = (video: Video): Plyr.Source => ({
  src: buildFileDownloadUrl(video.provider),
  type: `video/${video.type}`,
  size: buildVideoSize(video.provider),
})

const buildCaption = (caption: Caption): Plyr.Track => ({
  kind: 'captions',
  label: caption.name,
  srcLang: buildCaptionSrcLang(caption),
  src: buildFileDownloadUrl(caption.provider),
})

type PlyrPlayerProps = {
  id: string
  item: Movie | Episode

  onProgress: (progress: number) => void
}

const PlyrPlayer = ({ id, item, onProgress }: PlyrPlayerProps) => {
  const posterPath = useMemo(() => {
    if (item.kind === ItemKind.Movie) return item.posterPath
    else if (item.kind === ItemKind.Episode) return item.stillPath
  }, [item])

  useEffect(() => {
    const player = new Plyr(`video.PlyrPlayer#${id}`, {
      debug: process.env.NODE_ENV === 'development',
    })

    player.source = {
      type: 'video',
      title: item.title,
      sources: item.sources.map(buildSource),
      tracks: item.captions.map(buildCaption),
    }

    return () => {
      if (player.currentTime !== 0) onProgress(player.currentTime)
    }
  }, [id, item, onProgress, posterPath])

  return (
    <video
      className="PlyrPlayer"
      id={id}
      crossOrigin="true"
      playsInline
      controls
    />
  )
}

export default PlyrPlayer
