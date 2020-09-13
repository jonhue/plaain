import './Loading.scss'
import React from 'react'
import SoundWaveIcon from '../components/Nucleo/icons/soundWave.jsx'

export const Loading = () => (
  <div className="Loading">
    <div className="Loading__wrapper">
      <SoundWaveIcon width={48} height={48} />
    </div>
  </div>
)

export default Loading
