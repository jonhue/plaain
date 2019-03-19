import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
// import logo from './logo.svg'
// import './App.scss'

import { logIn } from './actions/auth'
import { index } from './actions/indexing'

import MicrosoftAuth from './services/auth/MicrosoftAuth'

import ForYou from './scenes/ForYou'
import Movies from './scenes/Movies'
import Shows from './scenes/Shows'
import Find from './scenes/Find'
import Welcome from './scenes/Welcome'
import NotFound from './scenes/NotFound'

import PlyrPlayer from './components/PlyrPlayer'

class App extends Component {
  constructor(props) {
    super(props)

    // this required for the login popup to close (https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/174)
    new MicrosoftAuth()
  }

  render() {
    if (this.props.user) {
      let player = null
      if (Object.values(this.props.movies).filter(movie => movie.role === 'library').length > 0) {
        player = <PlyrPlayer item={Object.values(this.props.movies).filter(movie => movie.role === 'library')[0]} />
      }

      return (
        <div className='App'>
          <button onClick={this.props.index}>Index</button>

          {player}

          <Router>
            <Switch>
              <Route path='/' exact component={ForYou} />
              <Route path='/movies' component={Movies} />
              <Route path='/shows' component={Shows} />
              <Route path='/find' component={Find} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      )
    } else {
      return (
        <div className='App'>
          <button onClick={this.props.logIn}>Launch</button>

          <Router>
            <Switch>
              <Route path='/' exact component={Welcome} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    user: state.auth.user,
    movies: state.movies
  }),
  { logIn, index }
)(App)
