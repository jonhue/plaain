import React, { Component } from 'react'
import './Cover.scss'

class Cover extends Component {
  render() {
    return (
      <img className='Cover' src={this.props.url} alt={this.props.alt} width={this.props.width} />
    )
  }
}

export default Cover
