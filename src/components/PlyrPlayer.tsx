import React, { useEffect } from 'react'
import {
  buildCaptionSrcLang,
  buildFileDownloadUrl,
  buildVideoSize,
  buildVideoType,
} from '../util'
import { Caption } from '../types/files/Caption'
import { Episode } from '../types/items/Episode'
import { Movie } from '../types/items/Movie'
import Plyr from 'plyr'
import { Provider } from '../types/providers/Provider'
import { RootState } from '../store'
import { Video } from '../types/files/Video'
import { providersSelector } from '../store/auth/selectors'
import { useSelector } from 'react-redux'

const findProvider = (providers: Provider[], providerId: string) => {
  const provider = providers.find(({ id }) => id === providerId)
  if (provider === undefined)
    throw new Error('Internal error: provider of item does not exist.')
  return provider
}

const buildSource =
  (providers: Provider[]) =>
  (video: Video): Plyr.Source => {
    const provider = findProvider(providers, video.provider.providerId)
    return {
      src: buildFileDownloadUrl(provider, video.provider),
      type: `video/${buildVideoType(video)}`,
      size: buildVideoSize(video.provider),
    }
  }

const buildCaption =
  (providers: Provider[]) =>
  (caption: Caption): Plyr.Track => {
    const provider = findProvider(providers, caption.provider.providerId)
    return {
      kind: 'captions',
      label: caption.name,
      srcLang: buildCaptionSrcLang(caption),
      src: buildFileDownloadUrl(provider, caption.provider),
    }
  }

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
  const providers = useSelector((state: RootState) =>
    providersSelector(state.auth),
  )

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
      sources: item.sources.map(buildSource(providers)),
      tracks: item.captions.map(buildCaption(providers)),
    }

    player.on('ready', () => {
      if (startAt !== undefined) player.forward(startAt)
    })

    return () => {
      if (player.currentTime !== 0) onProgress(player.currentTime)

      player.destroy()
    }
  }, [id, item, onProgress, providers, startAt])

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
