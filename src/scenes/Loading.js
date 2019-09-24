import React, { Component } from 'react'
import './Loading.scss'

import SoundWaveIcon from '../components/Nucleo/icons/soundWave.jsx'

class Loading extends Component {
  render() {
    return (
      <div className='Loading'>
        <div className='Loading__wrapper'>
          <SoundWaveIcon width={48} height={48} />
          {this.props.caption && <p className='small'>{this.props.caption}</p>}
        </div>
      </div>
    )
  }
}

export default Loading
