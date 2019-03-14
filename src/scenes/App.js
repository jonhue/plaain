import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as MsGraph from '@microsoft/microsoft-graph-client'
import logo from './logo.svg'
import './App.scss'

import AuthMS from './../services/auth/AuthMS'

import ForYou from './App/ForYou'
import Movies from './App/Movies'
import Shows from './App/Shows'
import Find from './App/Find'
import Settings from './App/Settings'

class App extends Component {
  constructor(props) {
    super(props)

    this.userAgentApplication = new AuthMS().perform()
    this.state = {
      user: this.userAgentApplication.getUser(),
      token: '',
      client: null
    }
  }

  render() {
    if (this.state.user) {
      return (
        <div className="App">
          <Route path="/" exact component={ForYou} />
          <Route path="/movies" component={Movies} />
          <Route path="/shows" component={Shows} />
          <Route path="/find" component={Find} />
          <Route path="/settings" component={Settings} />
        </div>
      )
    } else {
      return (
        <div className="App">
          <button onClick={this.logIn.bind(this)}>Log in</button>
        </div>
      )
    }
  }

  setTokenAndClient(accessToken) {
    let graphClient = MsGraph.Client.init({
      authProvider: (done) => {
        done(null, accessToken)
      }
    })
    console.log(`MS Graph token: ${accessToken}`)
    this.setState({
      token: accessToken, client: graphClient
    })
  }

  logIn() {
    this.userAgentApplication.loginPopup(AuthMS.config.graphScopes).then((idToken) => {
      this.userAgentApplication.acquireTokenSilent(AuthMS.config.graphScopes).then((accessToken) => {
         this.setTokenAndClient(accessToken)
       }, (error) => {
         this.userAgentApplication.acquireTokenPopup(AuthMS.config.graphScopes).then((accessToken) => {
           this.setTokenAndClient(accessToken)
         }, (error) => {
           console.log(error)
         })
       })
    }, (error) => {
      console.log(error)
    })
  }
}

export default App
