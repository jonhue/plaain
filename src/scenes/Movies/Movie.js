import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Movie.scss'

import PlyrPlayer from '../../components/PlyrPlayer'

import { movieSelector } from '../../selectors/movies'

class Movie extends Component {
  continue() {
    let plyr = document.querySelector('#player').plyr
    plyr.currentTime = this.movie.progress

    this.watch()
  }

  watch() {
    let player = document.querySelector('#player')
    let plyr = player.plyr

    plyr.on('exitfullscreen', () => {
      plyr.stop()
      player.style.display = 'none'
    })

    player.style.display = 'block'
    plyr.fullscreen.enter()
    plyr.play()
  }

  render() {
    this.movie = movieSelector(this.props.match.params.id)(this.props)

    return (
      <div className="Movie">
        <PlyrPlayer item={this.movie} />
        <img className="Movie__backdrop" src={this.movie.backdropUrl} alt="backdrop" />
        <div className="Movie__details">
          <img className='Movie__poster' src={this.movie.posterUrl} alt="poster" />
          <h1>{this.movie.name}</h1>
          <div className="Movie__information">
            <p className="small">{new Date(this.movie.releaseDate).getFullYear()}</p>
            <p className="small">{Math.floor(this.movie.runtime / 60) !== 0 && `${Math.floor(this.movie.runtime / 60)}h`} {this.movie.runtime % 60 !== 0 && `${this.movie.runtime % 60}m`}</p>
          </div>
          <div className="Movie__actions">
            {this.movie.progress !== 0 && <button className="primary" id="continue" onClick={this.continue.bind(this)}>Continue</button>}
            <button className={this.movie.progress === 0 ? "primary" : ""} id="watch" onClick={this.watch.bind(this)}>Watch</button>
            <a className="button" id="trailer" href={this.movie.trailerLink} target="_blank" rel="noopener noreferrer">Play trailer</a>
          </div>
          <p className="Movie__overview">{this.movie.overview}</p>
          <div className="Movie__starring">
            <h4>Starring</h4>
            {this.movie.cast.slice(0, 10).map((castMember, index) => {
              return <p key={index}><span className="link">{castMember.name}</span> · <span>{castMember.character}</span></p>
            })}
          </div>
          <div className="Movie__crew">
            <h4>Crew</h4>
            {this.movie.crew.slice(0, 10).map((crewMember, index) => {
              return <p key={index}><span className="link">{crewMember.name}</span> · <span>{crewMember.job}</span></p>
            })}
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
