import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// import './Movies.scss'

import Movie from './Movies/Movie'

class Movies extends Component {
  render() {
    return (
      <div className='Movies'>
        <Route path={`${this.props.match.path}/:id`} component={Movie}/>
        <Route
          exact
          path={this.props.match.path}
          render={() => <h3>Please select a movie.</h3>} />
      </div>
    )
  }
}

export default Movies
