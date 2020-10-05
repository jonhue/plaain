import React, { Component } from 'react'
import { connect } from 'react-redux'
import Plyr from 'plyr'
import './PlyrPlayer.scss'

import { FILE_TYPES } from '../../constants'

import PlyrCaption from './PlyrCaption'
import PlyrSource from './PlyrSource'

import { logInExpired } from '../actions/auth'

class PlyrPlayer extends Component {
  componentDidMount() {
    this.player = new Plyr(document.querySelector('#player'), {
      debug: process.env.NODE_ENV === 'development',
    })

    this.player.on('error', (error) => {
      console.log(error)

      this.props.logInExpired(this.props.item.provider)
    })

    this.player.on('timeupdate', (event) => {
      if (event.detail.plyr.currentTime !== 0) {
        this.props.updateItemAction({
          id: this.props.item.id,
          lastWatched: new Date().getTime(),
          progress: event.detail.plyr.currentTime,
        })
      }
    })

    this.player.on('exitfullscreen', () => {
      const component = document.querySelector('.PlyrPlayer')

      if (component && !component.dataset.preventExit) {
        this.player.stop()
        component.style.display = 'none'

        if (this.props.exitedAction) {
          this.props.exitedAction()
        }
      }
    })

    this.player.on('ended', () => {
      this.player.fullscreen.exit()
      document.querySelector('.PlyrPlayer').style.display = 'none'

      if (this.props.endedAction) {
        this.props.endedAction()
      }
    })
  }

  render() {
    if (
      this.props.item.files.filter((file) => file.type === FILE_TYPES.SOURCE)
        .length === 0
    ) {
      return null
    }

    return (
      <div className="PlyrPlayer">
        <video
          src={
            this.props.item.files.filter(
              (file) => file.type === FILE_TYPES.SOURCE,
            )[0].url
          }
          id="player"
          crossOrigin="true"
          playsInline
          controls
        >
          {this.props.item.files
            .filter((file) => file.type === FILE_TYPES.SOURCE)
            .map((source, index) => {
              return <PlyrSource source={source} key={index} />
            })}
          {this.props.item.files
            .filter((file) => file.type === FILE_TYPES.CAPTION)
            .map((caption, index) => {
              return (
                <PlyrCaption
                  caption={caption}
                  default={index === 0}
                  key={index}
                />
              )
            })}
          <a
            href={
              this.props.item.files.filter(
                (file) => file.type === FILE_TYPES.SOURCE,
              )[0].src
            }
            download
          >
            Download
          </a>
        </video>
      </div>
    )
  }
}

export default connect(null, { logInExpired })(PlyrPlayer)
