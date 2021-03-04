import './Loading.scss'
import React from 'react'
import { SoundWaveIcon } from '../components/icons/SoundWaveIcon'
import styles from '../_variables.scss'

export const Loading = () => (
  <div className="Loading">
    <div className="Loading__wrapper">
      <SoundWaveIcon color={styles.highlight} />
    </div>
  </div>
)
