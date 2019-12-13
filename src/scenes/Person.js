import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Person.scss'

import NotFound from './NotFound'

import Backdrop from '../components/Backdrop'
import Cover from '../components/Cover'
import HorizontalSlide from '../components/HorizontalSlide'

import { moviesByPersonSelector } from '../selectors/movies'
import { seasonsByPersonSelector } from '../selectors/seasons'
import { personSelector, personRolesSelector } from '../selectors/people'

class Person extends Component {
  render() {
    const id = Number.parseInt(this.props.match.params.id)

    const person = personSelector(id)({
      movies: this.props.movies,
      seasons: this.props.seasons
    })
    const movies = moviesByPersonSelector(id)({ movies: this.props.movies })
    const seasons = seasonsByPersonSelector(id)({ seasons: this.props.seasons })
    const roles = personRolesSelector(id, person.gender)({
      movies: this.props.movies,
      seasons: this.props.seasons
    })

    if (person) {
      return (
        <div className='Person'>
          <Backdrop url={(movies[0] || this.props.shows[seasons[0].showId]).backdropUrl} />
          <div className='Person__details'>
            <Cover url={person.profileUrl} alt='profile' width='50%' />
            <h1>{person.name}</h1>
            <h5>Known as</h5>
            <p>{roles.join(', ')}</p>
          </div>

          {movies.length > 0 && <div className='Person__movies'>
            <h2>Movies</h2>
            <HorizontalSlide items={movies} id='movies' />
          </div>}

          {seasons.length > 0 && <div className='Person__seasons'>
            <h2>TV seasons</h2>
            <HorizontalSlide items={seasons} id='seasons' />
          </div>}
        </div>
      )
    } else {
      return <NotFound />
    }
  }
}

export default connect(
  state => ({
    movies: state.movies,
    shows: state.shows,
    seasons: state.seasons
  })
)(Person)
