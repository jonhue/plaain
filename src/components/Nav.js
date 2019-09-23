import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Nav.scss'

import { index } from '../actions/indexing'

import PopcornIcon from './Nucleo/icons/popcorn.jsx'
import MovieIcon from './Nucleo/icons/movie.jsx'
import ShowIcon from './Nucleo/icons/show.jsx'
import ReloadIcon from './Nucleo/icons/reload.jsx'

class Nav extends Component {
  render() {
    return (
      <div className='Nav'>
        <Link to='/app/'>
          <PopcornIcon width={24} height={24} />
        </Link>
        <Link to='/app/movies'>
          <MovieIcon width={24} height={24} />
        </Link>
        <Link to='/app/shows'>
          <ShowIcon width={24} height={24} />
        </Link>
        <button onClick={this.props.index}>
          <ReloadIcon width={24} height={24} />
        </button>
      </div>
    )
  }
}

export default connect(
  null,
  { index }
)(Nav)
