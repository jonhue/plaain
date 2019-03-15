import React, { Component } from 'react'

class PlyrCaption extends Component {
  render() {
    return (
      <track
        kind='captions'
        label={this.props.caption.label}
        src={this.props.caption.src}
        srcLang={this.props.caption.srclang || 'en'}
        default={this.props.key === 0} />
    )
  }
}

export default PlyrCaption
