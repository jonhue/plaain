import React, { Component } from 'react'
import Plyr from 'plyr'
import './PlyrPlayer.scss'

import PlyrCaption from './PlyrPlayer/PlyrCaption'
import PlyrContinue from './PlyrPlayer/PlyrContinue'
import PlyrSource from './PlyrPlayer/PlyrSource'

class PlyrPlayer extends Component {
  componentDidMount() {
    this.player = new Plyr('#player', {
      debug: process.env.NODE_ENV === 'development'
    })
    this.player.on('play', () => {
      if (document.querySelector('button#continue')) {
        document.querySelector('button#continue').style.display = 'none'
      }
    })
    this.player.on('timeupdate', event => {
      if (event.detail.plyr.currentTime !== 0) {
        // this.props.item.progress = event.detail.plyr.currentTime
      }
    })
  }

  render() {
    if (this.props.item.files.filter(file => file.type === 'source').length === 0) {
      return null
    }
    console.log(this.props.item.files.filter(file => file.type === 'source')[0].url)

    return (
      <div className='PlyrPlayer'>
        <video
          poster={this.props.item.backdropUrl}
          src={this.props.item.files.filter(file => file.type === 'source')[0].url}
          id='player' crossOrigin='true' playsInline controls>
          {this.props.item.files.filter(file => file.type === 'source').map((source, index) => {
            return (<PlyrSource source={source} key={index} />)
          })}
          {this.props.item.files.filter(file => file.type === 'caption').map((caption, index) => {
            return (<PlyrCaption caption={caption} key={index} />)
          })}
          <a href={this.props.item.files.filter(file => file.type === 'source')[0].src} download>Download</a>
        </video>
        <PlyrContinue parent={this} />
      </div>
    )
  }
}

export default PlyrPlayer
