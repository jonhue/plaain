import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import './Movies.scss'

import Movie from './Movies/Movie'

import HorizontalSlide from '../components/HorizontalSlide'

class Movies extends Component {
  componentDidMount() {
    document.querySelector('.Nav a:nth-child(2)').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:nth-child(2)').classList.remove('active')
  }

  render() {
    return (
      <div className='Movies'>
        <Route path={`${this.props.match.path}/:id`} component={Movie}/>
        <Route
          exact
          path={this.props.match.path}
          render={() => (
            <div className='Movies__index'>
              <h2>Movies</h2>
              <HorizontalSlide items={Object.values(this.props.movies)} id='movies' width='200px' />
            </div>
          )} />
      </div>
    )
  }
}

export default connect(
  state => ({
    movies: state.movies
  })
)(Movies)
