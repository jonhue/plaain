import React, { Component } from 'react'
import { connect } from 'react-redux'
import Plyr from 'plyr'
import './PlyrPlayer.scss'
import 'plyr/src/sass/plyr.scss'

import PlyrCaption from './PlyrPlayer/PlyrCaption'
import PlyrSource from './PlyrPlayer/PlyrSource'

import { logInExpired } from '../actions/auth'
import { updateMovie } from '../actions/movies'

class PlyrPlayer extends Component {
  componentDidMount() {
    if (document.querySelector('#player')) {
      this.player = new Plyr(document.querySelector('#player'), {
        debug: process.env.NODE_ENV === 'development'
      })
      this.player.on('error', error => {
        console.log(error)

        if (error.statusCode === 401) {
          this.props.logInExpired(this.props.item.provider)
        }
      })
      this.player.on('playing', () => {
        this.props.updateMovie({
          ...this.props.item,
          lastWatched: new Date().getTime()
        })
      })
      this.player.on('timeupdate', event => {
        if (event.detail.plyr.currentTime !== 0 ) {
          this.props.updateMovie({
            ...this.props.item,
            progress: event.detail.plyr.currentTime
          })
        }
      })
    }
  }

  render() {
    if (
      this.props.item.files.filter(file => file.type === 'source').length === 0
    ) {
      return null
    }

    return (
      <div className='PlyrPlayer'>
        <video
          src={this.props.item.files
            .filter(file => file.type === 'source')[0].url}
          id='player' crossOrigin='true' playsInline controls>
          {this.props.item.files.filter(file => file.type === 'source')
            .map((source, index) => {
              return <PlyrSource source={source} key={index} />
            })}
          {this.props.item.files.filter(file => file.type === 'caption')
            .map((caption, index) => {
              return (
                <PlyrCaption
                  caption={caption}
                  default={index === 0}
                  key={index} />
              )
            })}
          <a href={this.props.item.files.filter(file => file.type === 'source')[0].src} download>Download</a>
        </video>
      </div>
    )
  }
}

export default connect(
  null,
  { logInExpired, updateMovie }
)(PlyrPlayer)
