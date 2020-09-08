import React, { Component } from 'react'

class PlyrSource extends Component {
  render() {
    return (
      <source
        src={this.props.source.url}
        type={this.props.source.mimeType}
        size={this.props.source.information}
      />
    )
  }
}

export default PlyrSource
