import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserAgentApplication } from 'msal'
// import logo from './logo.svg'
import './App.scss'

import { logIn } from '../redux/actions'

import MicrosoftAuth from '../services/auth/MicrosoftAuth'

import ForYou from './App/ForYou'
import Movies from './App/Movies'
import Shows from './App/Shows'
import Find from './App/Find'
import Welcome from './App/Welcome'
import NotFound from './App/NotFound'

class App extends Component {
  constructor(props) {
    super(props)

    new UserAgentApplication(
      MicrosoftAuth.config.clientID,
      'https://login.microsoftonline.com/common',
      null
    )
  }

  render() {
    if (this.props.user) {
      return (
        <div className='App'>
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
          <button onClick={this.logIn}>Launch</button>

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

  logIn = () => {
    new MicrosoftAuth().perform().then((auth) => {
      this.props.logIn(auth)
    }, (error) => console.log(error))
  }
}

export default connect(
  (state) => ({ user: state.auth.user }),
  { logIn }
)(App)
