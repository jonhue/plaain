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
    this.player.on('play', event => {
      if (document.querySelector('button#continue')) {
        document.querySelector('button#continue').style.display = 'none'
      }
    });
    this.player.on('timeupdate', event => {
      if (event.detail.plyr.currentTime !== 0) {
        this.props.video.time = event.detail.plyr.currentTime
      }
    });
  }

  render() {
    if (this.props.video.sources.length === 0) {
      return null
    }

    return (
      <div>
        <video
          poster={this.props.video.poster}
          src={this.props.video.sources[0].src}
          id="player" crossOrigin="true" playsInline controls>
          {this.props.video.sources.map((source) => {
            return (<PlyrSource source={source} />)
          })}
          {this.props.video.captions.map((caption, i) => {
            return (<PlyrCaption caption={caption} index={i} />)
          })}
          <a href={this.props.video.sources[0].src} download>Download</a>
        </video>
        <PlyrContinue parent={this} />
      </div>
    )
  }
}

export default PlyrPlayer
