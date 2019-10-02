import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './ForYou.scss'

import { PROVIDERS } from '../constants'

import { index } from '../actions/indexing'

import HorizontalSlide from '../components/HorizontalSlide'

import {
  inProgressMoviesSelector,
  recentlyWatchedMoviesSelector
} from '../selectors/movies'
import {
  inProgressSeasonsSelector,
  recentlyWatchedSeasonsSelector
} from '../selectors/seasons'

class ForYou extends Component {
  constructor(props) {
    super(props)

    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    this.state = {
      inProgress: [
        ...inProgressMoviesSelector()({ movies: this.props.movies }),
        ...inProgressSeasonsSelector()({ seasons: this.props.seasons })
      ].sort((a, b) => (a.lastWatched > b.lastWatched) ? -1 : 1),
      recentlyWatched: [
        ...recentlyWatchedMoviesSelector(oneMonthAgo)({
          movies: this.props.movies
        }),
        ...recentlyWatchedSeasonsSelector(oneMonthAgo)({
          seasons: this.props.seasons
        })
      ].sort((a, b) => (a.lastWatched > b.lastWatched) ? -1 : 1)
    }
  }

  componentDidMount() {
    document.querySelector('.Nav a:first-child').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:first-child').classList.remove('active')
  }

  render() {
    if (
      this.state.inProgress.length > 0 ||
        this.state.recentlyWatched.length > 0
    ) {
      return (
        <div className='ForYou'>
          {this.state.inProgress.length > 0 && <section>
            <h2>Continue watching</h2>
            <HorizontalSlide items={this.state.inProgress} id='inProgress' width='200px' />
          </section>}

          {this.state.recentlyWatched.length > 0 && <section>
            <h2>Recently watched</h2>
            <HorizontalSlide items={this.state.recentlyWatched} id='recentlyWatched' width='200px' />
          </section>}
        </div>
      )
    } else if (
      Object.values(PROVIDERS).filter(provider => {
        return this.props.auth[provider].token !== null
      }).length === 0
    ) {
      return (
        <div className='ForYou'>
          <h2>Get started</h2>
          <p>To watch your movies and TV shows, you first have to sign in with the cloud service that hosts your media.</p>
          <Link to='/app/settings' className='button'>
            Authenticate
          </Link>
          <p className='small'>Note that Plaain may <span className='bold'>not</span> be used to stream pirated content or publicly share your private media library. You may only connect to your private cloud storage.</p>
        </div>
      )
    } else if (
      Object.entries(this.props.movies).length === 0 &&
        Object.entries(this.props.shows).length === 0
    ) {
      return (
        <div className='ForYou'>
          <h2>Get started</h2>
          <p>You signed into a cloud service, but we didn&apos;t find any movies or TV shows.</p>
          <p>It&apos;s likely that you just have to move some of your files around and create some folders to make it work.</p>
          <p>Reference the getting started guide to learn how to organize your files so that Plaain finds them. After you&apos;re done, just re-index.</p>
          <div className='ForYou__buttons'>
            <a className='button primary' href='https://github.com/jonhue/plaain#getting-started' target='_blank' rel='noopener noreferrer'>Getting started</a>
            <button onClick={this.props.index}>Index</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='ForYou'>
          <h2>Get started</h2>
          <p>Here, you&apos;ll be able to find your recently watched movie or the show you didn&apos;t finish yet.</p>
          <div className='ForYou__buttons'>
            {Object.entries(this.props.movies).length > 0 && <Link to='/app/movies' className='button'>
              Discover your movies
            </Link>}
            {Object.entries(this.props.shows).length > 0 && <Link to='/app/shows' className='button'>
              Discover your shows
            </Link>}
          </div>
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    movies: state.movies,
    shows: state.shows,
    seasons: state.seasons,
    auth: state.auth
  }),
  { index }
)(ForYou)
