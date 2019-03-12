import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.scss'

import ForYou from './App/ForYou'
import Movies from './App/Movies'
import Shows from './App/Shows'
import Find from './App/Find'
import Settings from './App/Settings'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={ForYou} />
        <Route path="/movies" component={Movies} />
        <Route path="/shows" component={Shows} />
        <Route path="/find" component={Find} />
        <Route path="/settings" component={Settings} />
      </div>
    )
  }
}

export default App
