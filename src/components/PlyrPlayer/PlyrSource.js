import React, { Component } from 'react'

class PlyrSource extends Component {
  render() {
    console.log(this.props.source.information.toString())
    return (
      <source
        src={this.props.source.url}
        type={this.props.source.mimeType}
        size={this.props.source.information} />
    )
  }
}

export default PlyrSource
