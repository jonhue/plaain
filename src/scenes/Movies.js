import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Movies.scss'

import VerticalSlide from '../components/VerticalSlide'
import ZoomIcon from '../components/Nucleo/icons/zoom.jsx'

class Movies extends Component {
  componentDidMount() {
    document.querySelector('.Nav a:nth-child(2)').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:nth-child(2)').classList.remove('active')
  }

  render() {
    return (
      <div className='Movies'>
        <div className='Movies__find'>
          <Link to='/app/find'>
            <ZoomIcon width={24} height={24} />
          </Link>
        </div>
        <VerticalSlide items={Object.values(this.props.movies)} id='movies' path='movies' />
      </div>
    )
  }
}

export default connect(
  state => ({
    movies: state.movies
  })
)(Movies)
