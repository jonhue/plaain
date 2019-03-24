import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import './Item.scss'

import Cover from './Cover'

class Item extends Component {
  render() {
    return (
      <div className='Item'>
        <Link to={this.props.item.path}>
          <Cover url={this.props.item.posterUrl || '/cover.png'} color={this.props.item.posterColor} alt={this.props.item.name} progress={((this.props.item.progress || 0) * 100) / this.props.item.runtime} height={this.props.height} width={this.props.width} />
        </Link>
      </div>
    )
  }
}

export default Item
