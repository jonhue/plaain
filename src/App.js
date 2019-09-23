import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.scss'

// import MicrosoftAuth from './services/auth/MicrosoftAuth'

import ForYou from './scenes/ForYou'
import Movies from './scenes/Movies'
import Shows from './scenes/Shows'
import Find from './scenes/Find'
import NotFound from './scenes/NotFound'

import Loading from './components/Loading'
import Nav from './components/Nav'

class App extends Component {
  // constructor(props) {
  //   super(props)
  //
  //   // this required for the login popup to close (https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/174)
  //   new MicrosoftAuth()
  // }

  render() {
    if (this.props.indexing || this.props.authenticating) {
      return (
        <div className='App'>
          <Loading />
        </div>
      )
    } else {
      return (
        <div className='App'>
          <Router>
            <Switch>
              <Route path='/' exact component={ForYou} />
              <Route path='/movies' component={Movies} />
              <Route path='/shows' component={Shows} />
              <Route path='/find' exact component={Find} />
              <Route component={NotFound} />
            </Switch>

            <Nav />
          </Router>
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    indexing: state.indexing.loading,
    authenticating: state.auth.loading
  })
)(App)
