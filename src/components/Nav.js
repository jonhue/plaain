import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Nav.scss'

import PopcornIcon from './icons/Nucleo/popcorn.js'
import MovieIcon from './icons/Nucleo/movie-61.js'
import ShowIcon from './icons/Nucleo/desktop-screen.js'
import GearIcon from './icons/Nucleo/settings-gear.js'

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <Link to="/app">
          <PopcornIcon width={24} height={24} />
          <p>For you</p>
        </Link>
        <Link
          disabled={Object.entries(this.props.movies).length === 0}
          to="/app/movies"
        >
          <MovieIcon width={24} height={24} />
          <p>Movies</p>
        </Link>
        <Link
          disabled={Object.entries(this.props.shows).length === 0}
          to="/app/shows"
        >
          <ShowIcon width={24} height={24} />
          <p>Shows</p>
        </Link>
        <Link to="/app/settings">
          <GearIcon width={24} height={24} />
          <p>Settings</p>
        </Link>
      </div>
    )
  }
}

export default connect((state) => ({
  movies: state.movies,
  shows: state.shows,
}))(Nav)
