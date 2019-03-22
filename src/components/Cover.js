import React, { Component } from 'react'
import './Cover.scss'

class Cover extends Component {
  render() {
    return (
      <div className='Cover' style={{height: `${this.props.height}px`, width: `${this.props.width}px`}}>
        <div className='Cover__progress' style={{width: `${this.props.progress}%`}} />
        <img className='Cover__image' src={this.props.url} alt={this.props.alt} style={{'--box-shadow-color': this.props.color.replace('rgb', 'rgba').replace(')', ', 0.16)')}} />
      </div>
    )
  }
}

export default Cover
