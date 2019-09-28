import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Person.scss'

import NotFound from './NotFound'

import Cover from '../components/Cover'
import HorizontalSlide from '../components/HorizontalSlide'

import { moviesByPersonSelector } from '../selectors/movies'
import { seasonsByPersonSelector } from '../selectors/seasons'
import { personSelector, personRolesSelector } from '../selectors/people'

class Person extends Component {
  constructor(props) {
    super(props)

    const id = Number.parseInt(this.props.match.params.id)

    this.state = {
      person: personSelector(id)({
        movies: this.props.movies,
        seasons: this.props.seasons
      }),
      roles: personRolesSelector(id)({
        movies: this.props.movies,
        seasons: this.props.seasons
      }),
      movies: moviesByPersonSelector(id)({ movies: this.props.movies }),
      seasons: seasonsByPersonSelector(id)({ seasons: this.props.seasons })
    }
  }

  render() {
    if (this.state.person) {
      return (
        <div className='Person'>
          <img className='Person__backdrop' src={(this.state.movies[0] || this.props.shows[this.state.seasons[0].showId]).backdropUrl} alt='backdrop' />
          <div className='Person__details'>
            <Cover url={this.state.person.profileUrl} alt='profile' width='50%' />
            <h1>{this.state.person.name}</h1>
            <h5>Known for</h5>
            <p>{this.state.roles.join(', ')}</p>
          </div>

          {this.state.movies.length > 0 && <section>
            <h2>Movies</h2>
            <HorizontalSlide items={this.state.movies} id='movies' width='200px' />
          </section>}

          {this.state.seasons.length > 0 && <section>
            <h2>TV seasons</h2>
            <HorizontalSlide items={this.state.seasons} id='seasons' width='200px' />
          </section>}
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
