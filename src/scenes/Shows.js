import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Shows.scss'

import VerticalSlide from '../components/VerticalSlide'
import ZoomIcon from '../components/Nucleo/icons/zoom.jsx'

class Shows extends Component {
  componentDidMount() {
    document.querySelector('.Nav a:nth-child(3)').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:nth-child(3)').classList.remove('active')
  }

  render() {
    return (
      <div className='Shows'>
        {Object.entries(this.props.shows).length > 0 && (
          <div className='Shows__wrapper'>
            <div className='Shows__find'>
              <Link to='/app/find'>
                <ZoomIcon width={24} height={24} />
              </Link>
            </div>
            <VerticalSlide items={Object.values(this.props.shows)} id='shows' path='shows' />
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    shows: state.shows
  })
)(Shows)
