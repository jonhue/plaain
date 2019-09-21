import React, { Component } from 'react'
import Swiper from 'swiper'
import './ItemList.scss'
import 'swiper/swiper.scss'

import Item from './Item'

class ItemList extends Component {
  componentDidMount() {
    new Swiper(document.querySelector(`.ItemList#${this.props.id} .swiper-container`), {
      cssMode: true,
      spaceBetween: 20
    })
  }

  render() {
    return (
      <div className='ItemList' id={this.props.id}>
        <div className='swiper-container'>
          <div className='swiper-wrapper'>
            {this.props.items.map(item => {
              return <div className='swiper-slide' key={item.id}>
                <Item item={item} />
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default ItemList
