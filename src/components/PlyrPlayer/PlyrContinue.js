import React, { Component } from 'react'

class PlyrContinue extends Component {
  continueWatching() {
    document.querySelector('button#continue').style.display = 'none'
    this.props.parent.player.play()
    this.props.parent.player.currentTime = this.props.parent.props.video.time
  }

  render() {
    if (this.props.parent.props.video.time === 0) {
      return null
    }

    return (
      <button
        id="continue"
        onClick={this.continueWatching.bind(this)}>
        Continue watching
      </button>
    )
  }
}

export default PlyrContinue
