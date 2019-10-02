import React, { Component } from 'react'
import ISO6391 from 'iso-639-1'

class PlyrCaption extends Component {
  render() {
    return (
      <track
        kind='captions'
        label={this.props.caption.information}
        src={this.props.caption.url}
        srcLang={ISO6391.getCode(this.props.caption.information) || 'en'}
        default={this.props.default} />
    )
  }
}

export default PlyrCaption
