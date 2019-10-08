import React, { Component } from 'react'
import './Backdrop.scss'

class Backdrop extends Component {
  render() {
    return (
      <picture className='Backdrop'>
        <img src={this.props.url} alt='backdrop' />
      </picture>
    )
  }
}

export default Backdrop
