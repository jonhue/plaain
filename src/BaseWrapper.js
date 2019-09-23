import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import './BaseWrapper.scss'

import App from './App'
import Welcome from './scenes/Welcome'
import NotFound from './scenes/NotFound'

class BaseWrapper extends Component {
  render() {
    return (
      <div className='BaseWrapper'>
        <Router>
          <Switch>
            <Route path='/' exact component={Welcome} />
            <Route path='/app' component={App} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BaseWrapper
