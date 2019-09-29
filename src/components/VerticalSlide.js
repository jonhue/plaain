import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swiper from 'swiper'
import 'swiper/swiper.scss'
import './VerticalSlide.scss'

import Cover from './Cover'

class VerticalSlide extends Component {
  componentDidMount() {
    new Swiper(
      document.querySelector(
        `.VerticalSlide#${this.props.id} .swiper-container`
      ), {
        direction: 'vertical',
        slidesPerView: 'auto',
        grabCursor: true,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0,
          stretch: 425,
          depth: 150,
          modifier: 1,
          slideShadows : false
        },
        history: {
          replaceState: true,
          key: this.props.path
        }
      }
    )
  }

  render() {
    return (
      <div className='VerticalSlide' id={this.props.id}>
        <div className='swiper-container'>
          <div className='swiper-wrapper'>
            {this.props.items.length ? this.props.items.map(item => {
              return (
                <div className='swiper-slide' data-history={item.id} key={item.id}>
                  <Link to={item.path}>
                    <Cover url={item.posterUrl || '/cover.png'} alt={item.name} width='100%' />
                  </Link>
                </div>
              )
            }) : (
              <div className='swiper-slide'>
                <h3>Nothing found.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default VerticalSlide
