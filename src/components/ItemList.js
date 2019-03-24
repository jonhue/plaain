import React, { Component } from 'react'
// import './ItemList.scss'

import Item from './Item'

class ItemList extends Component {
  render() {
    return (
      <div className='ItemList'>
        {this.props.items.map(item => <Item item={item} height={this.props.itemHeight} width={this.props.itemWidth} key={item.id} />)}
      </div>
    )
  }
}

export default ItemList
