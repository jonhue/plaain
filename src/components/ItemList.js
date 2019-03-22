import React, { Component } from 'react'
import Glide from '@glidejs/glide'
import './ItemList.scss'

import Item from './Item'

class ItemList extends Component {
  componentDidMount() {
    new Glide('.glide').mount()
  }

  render() {
    return (
      <div className='ItemList'>
        <div class="glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              {this.props.items.map(item => {
                return <li class="glide__slide">
                  <Item item={item} height={this.props.itemHeight} width={this.props.itemWidth} key={item.id} />
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemList
