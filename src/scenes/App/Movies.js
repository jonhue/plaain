import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './Movies.scss'

import Movie from './Movies/Movie'

class Movies extends Component {
  render({ match }) {
    return (
      <div className='Movies'>
        <Route path={`${match.path}/:id`} component={Movie}/>
        <Route
          exact
          path={match.path}
          render={() => <h3>Please select a movie.</h3>} />
      </div>
    )
  }
}

export default Movies
