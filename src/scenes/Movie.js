import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Movie.scss'

import NotFound from './NotFound'

import Cover from '../components/Cover'
import PersonList from '../components/PersonList'
import PlyrPlayer from '../components/PlyrPlayer'

import { movieSelector } from '../selectors/movies'

class Movie extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: movieSelector(this.props.match.params.id)({
        movies: this.props.movies
      })
    }
  }

  componentDidMount() {
    document.querySelector('.Nav a:nth-child(2)').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:nth-child(2)').classList.remove('active')
  }

  continue() {
    let plyr = document.querySelector('.PlyrPlayer #player').plyr
    plyr.on('play', () => {
      plyr.currentTime = this.state.movie.progress
    })

    this.watch()
  }

  watch() {
    let player = document.querySelector('.PlyrPlayer')
    let plyr = player.querySelector('#player').plyr

    plyr.on('exitfullscreen', () => {
      plyr.stop()
      player.style.display = 'none'
    })

    player.style.display = 'block'
    plyr.fullscreen.enter()
    plyr.play()
  }

  render() {
    if (this.state.movie) {
      return (
        <div className='Movie'>
          <PlyrPlayer item={this.state.movie} />
          <img className='Movie__backdrop' src={this.state.movie.backdropUrl} alt='backdrop' />
          <div className='Movie__details'>
            <Cover url={this.state.movie.posterUrl} alt='poster' width='50%' />
            <h1>{this.state.movie.name}</h1>
            <div className='Movie__information'>
              <p className='small'>{new Date(this.state.movie.releaseDate).getFullYear()}</p>
              <p className='small'>{Math.floor(this.state.movie.runtime / 60) !== 0 && `${Math.floor(this.state.movie.runtime / 60)}h`} {this.state.movie.runtime % 60 !== 0 && `${this.state.movie.runtime % 60}m`}</p>
            </div>
            <div className='Movie__actions'>
              {this.state.movie.progress !== 0 && <button className='primary' id='continue' onClick={this.continue.bind(this)}>Continue</button>}
              <button className={this.state.movie.progress === 0 ? 'primary' : ''} id='watch' onClick={this.watch.bind(this)}>Watch</button>
              <a className='button' id='trailer' href={this.state.movie.trailerLink} target='_blank' rel='noopener noreferrer'>Play trailer</a>
            </div>
            <p className='Movie__overview'>{this.state.movie.overview}</p>
            <div className='Movie__cast'>
              <h4>Starring</h4>
              <PersonList people={this.state.movie.cast} attribute='character' />
            </div>
            <div className='Movie__crew'>
              <h4>Crew</h4>
              <PersonList people={this.state.movie.crew} attribute='job' />
            </div>
          </div>
        </div>
      )
    } else {
      return <NotFound />
    }
  }
}

export default connect(
  state => ({
    movies: state.movies
  })
)(Movie)
