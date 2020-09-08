import './Loading.scss'
import React from 'react'
import SoundWaveIcon from '../components/Nucleo/icons/soundWave.jsx'

type LoadingProps = {
  caption?: string
}

export const Loading = ({ caption }: LoadingProps) => (
  <div className="Loading">
    <div className="Loading__wrapper">
      <SoundWaveIcon width={48} height={48} />
      {caption && <p className="small">{caption}</p>}
    </div>
  </div>
)

export default Loading
