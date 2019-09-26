import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './ForYou.scss'

import HorizontalSlide from '../components/HorizontalSlide'

import {
  inProgressMoviesSelector,
  recentlyWatchedMoviesSelector
} from '../selectors/movies'

class ForYou extends Component {
  componentDidMount() {
    document.querySelector('.Nav a:first-child').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:first-child').classList.remove('active')
  }

  render() {
    let oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    this.inProgress = inProgressMoviesSelector()({ movies: this.props.movies })
    this.recentlyWatched =
      recentlyWatchedMoviesSelector(oneMonthAgo)({ movies: this.props.movies })

    return (
      <div className='ForYou'>
        {this.inProgress.length > 0 && <section>
          <h2>Continue watching</h2>
          <HorizontalSlide items={this.inProgress} id='inProgress' width='200px' />
        </section>}

        {this.recentlyWatched.length > 0 && <section>
          <h2>Recently watched</h2>
          <HorizontalSlide items={this.recentlyWatched} id='recentlyWatched' width='200px' />
        </section>}

        {this.inProgress.length === 0 && this.recentlyWatched.length === 0 && <section>
          <h2>Get started</h2>
          {Object.entries(this.props.movies).length > 0 && <Link to='/app/movies' className='button'>
            Discover your movies
          </Link>}
          {Object.entries(this.props.shows).length > 0 && <Link to='/app/shows' className='button'>
            Discover your shows
          </Link>}
        </section>}
      </div>
    )
  }
}

export default connect(
  state => ({
    movies: state.movies,
    shows: state.shows
  })
)(ForYou)
