import React, { Component } from 'react'

class PlyrCaption extends Component {
  render() {
    return (
      <track
        kind='captions'
        label={this.props.caption.information}
        src={this.props.caption.url}
        srcLang={this.props.caption.srclang || 'en'}
        default={this.props.default} />
    )
  }
}

export default PlyrCaption
