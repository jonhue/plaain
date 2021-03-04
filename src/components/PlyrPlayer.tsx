import React, { useEffect } from 'react'
import {
  buildCaptionSrcLang,
  buildFileDownloadUrl,
  buildVideoSize,
  buildVideoType,
} from '../util'
import { Caption } from '../types/files/captions/Caption'
import { Episode } from '../types/items/Episode'
import { Movie } from '../types/items/Movie'
import Plyr from 'plyr'
import { Video } from '../types/files/videos/Video'

const buildSource = (video: Video): Plyr.Source => ({
  src: buildFileDownloadUrl(video.provider),
  type: `video/${buildVideoType(video)}`,
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
  startAt?: number

  onProgress: (progress: number) => void
}

export const PlyrPlayer = ({
  id,
  item,
  startAt,
  onProgress,
}: PlyrPlayerProps) => {
  useEffect(() => {
    const player = new Plyr(`video.PlyrPlayer#${id}`, {
      debug: process.env.NODE_ENV === 'development',
      controls: [
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'settings',
        'fullscreen',
      ],
      settings: ['captions', 'quality'],
      autoplay: true,
      invertTime: true,
      toggleInvert: true,
    })

    player.source = {
      type: 'video',
      title: item.title,
      sources: item.sources.map(buildSource),
      tracks: item.captions.map(buildCaption),
    }

    player.on('ready', () => {
      if (startAt !== undefined) player.forward(startAt)
    })

    return () => {
      if (player.currentTime !== 0) onProgress(player.currentTime)

      player.destroy()
    }
  }, [id, item, onProgress, startAt])

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
