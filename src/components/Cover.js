import React, { Component } from 'react'
import './Cover.scss'

class Cover extends Component {
  render() {
    return (
      <div className='Cover'>
        <img className='Cover__image' src={this.props.url} alt={this.props.alt} style={{'--box-shadow-color': this.props.color && this.props.color.replace('rgb', 'rgba').replace(')', ', 0.16)')}} />
      </div>
    )
  }
}

export default Cover
