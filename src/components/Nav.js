import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'

import PopcornIcon from './Nucleo/icons/popcorn.jsx'
import MovieIcon from './Nucleo/icons/movie.jsx'
import ShowIcon from './Nucleo/icons/show.jsx'
import GearIcon from './Nucleo/icons/gear.jsx'

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
        <Link to='/app/settings'>
          <GearIcon width={24} height={24} />
        </Link>
      </div>
    )
  }
}

export default Nav
