import React, { Component } from 'react'

class PlyrSource extends Component {
  render() {
    return (
      <source
        src={this.props.source.src}
        type={this.props.source.type}
        size={this.props.source.size} />
    )
  }
}

export default PlyrSource
