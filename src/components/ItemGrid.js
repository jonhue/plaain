import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ItemGrid.scss'

import Cover from './Cover'

class ItemGrid extends Component {
  render() {
    return (
      <div className='ItemGrid' id={this.props.id}>
        {this.props.items.length ? this.props.items.map(item => {
          return (
            <div className='ItemGrid__item' key={item.id}>
              <Link to={item.path}>
                <Cover url={item.posterUrl || '/cover.png'} alt={item.name} width='100%' />
              </Link>
            </div>
          )
        }) : (
          <div className='ItemGrid__item'>
            <h3>Nothing found.</h3>
          </div>
        )}
      </div>
    )
  }
}

export default ItemGrid
