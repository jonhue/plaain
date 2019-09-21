import React, { Component } from 'react'
import './Cover.scss'

class Cover extends Component {
  render() {
    return (
      <div className='Cover'>
        <img className='Cover__image' src={this.props.url} alt={this.props.alt} />
      </div>
    )
  }
}

export default Cover
