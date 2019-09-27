import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Movie.scss'

import Cover from '../components/Cover'
import PersonList from '../components/PersonList'
import PlyrPlayer from '../components/PlyrPlayer'

import { movieSelector } from '../selectors/movies'

class Movie extends Component {
  componentDidMount() {
    document.querySelector('.Nav a:nth-child(2)').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:nth-child(2)').classList.remove('active')
  }

  continue() {
    let plyr = document.querySelector('.PlyrPlayer #player').plyr
    plyr.on('play', () => {
      plyr.currentTime = this.movie.progress
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
    this.movie =
      movieSelector(this.props.match.params.id)({ movies: this.props.movies })

    return (
      <div className='Movie'>
        <PlyrPlayer item={this.movie} />
        <img className='Movie__backdrop' src={this.movie.backdropUrl} alt='backdrop' />
        <div className='Movie__details'>
          <Cover url={this.movie.posterUrl} alt='poster' width='50%' />
          <h1>{this.movie.name}</h1>
          <div className='Movie__information'>
            <p className='small'>{new Date(this.movie.releaseDate).getFullYear()}</p>
            <p className='small'>{Math.floor(this.movie.runtime / 60) !== 0 && `${Math.floor(this.movie.runtime / 60)}h`} {this.movie.runtime % 60 !== 0 && `${this.movie.runtime % 60}m`}</p>
          </div>
          <div className='Movie__actions'>
            {this.movie.progress !== 0 && <button className='primary' id='continue' onClick={this.continue.bind(this)}>Continue</button>}
            <button className={this.movie.progress === 0 ? 'primary' : ''} id='watch' onClick={this.watch.bind(this)}>Watch</button>
            <a className='button' id='trailer' href={this.movie.trailerLink} target='_blank' rel='noopener noreferrer'>Play trailer</a>
          </div>
          <p className='Movie__overview'>{this.movie.overview}</p>
          <div className='Movie__cast'>
            <h4>Starring</h4>
            <PersonList people={this.movie.cast} attribute='character' />
          </div>
          <div className='Movie__crew'>
            <h4>Crew</h4>
            <PersonList people={this.movie.crew} attribute='job' />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    movies: state.movies
  })
)(Movie)
