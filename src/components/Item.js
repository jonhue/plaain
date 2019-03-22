import React, { Component } from 'react'
// import './Item.scss'

import Cover from './Cover'

class Item extends Component {
  render() {
    return (
      <div className='Item'>
        <Cover url={this.props.item.posterUrl} color={this.props.item.posterColor} alt={this.props.item.name} progress={((this.props.item.progress || 0) * 100) / this.props.item.runtime} height={this.props.height} width={this.props.width} />
      </div>
    )
  }
}

export default Item
