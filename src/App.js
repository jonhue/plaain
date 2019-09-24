import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.scss'

import VERSION from './version'
import { AUTOMATIC_INDEXING } from './reducers/settings'
import { index } from './actions/indexing'

import MicrosoftAuth from './services/auth/MicrosoftAuth'

import ForYou from './scenes/ForYou'
import Movies from './scenes/Movies'
import Movie from './scenes/Movie'
import Shows from './scenes/Shows'
import Find from './scenes/Find'
import Loading from './scenes/Loading'
import NotFound from './scenes/NotFound'

import Nav from './components/Nav'

class App extends Component {
  constructor(props) {
    super(props)

    // this is required for the login popup to close;
    // see https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/174
    new MicrosoftAuth()
  }

  componentDidMount() {
    let updatedVersion = this.checkVersion()

    if (!updatedVersion) {
      this.automaticIndexing()
    }
  }

  componentDidUpdate() {
    this.checkVersion()
  }

  checkVersion() {
    if (this.props.version !== VERSION) {
      this.props.index('Updating app...')
      return true
    } else {
      return false
    }
  }

  automaticIndexing() {
    if (
      this.props.automaticIndexing === AUTOMATIC_INDEXING.ALWAYS ||
      new Date().getFullYear() !==
        new Date(this.props.lastIndexed).getFullYear() ||
      new Date().getMonth() !== new Date(this.props.lastIndexed).getMonth() ||
      (this.props.automaticIndexing !== AUTOMATIC_INDEXING.MONTHLY &&
        new Date().getDate() !== new Date(this.props.lastIndexed).getDate())
    ) {
      this.props.index()
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div className='App'>
          <Loading caption={this.props.loading} />
        </div>
      )
    } else {
      return (
        <div className='App'>
          <Switch>
            <Route path={`${this.props.match.path}/`} exact component={ForYou} />
            <Route path={`${this.props.match.path}/movies`} component={Movies} />
            <Route path={`${this.props.match.path}/movie/:id`} component={Movie} />
            <Route path={`${this.props.match.path}/shows`} component={Shows} />
            <Route path={`${this.props.match.path}/find`} exact component={Find} />
            <Route component={NotFound} />
          </Switch>

          <Nav />
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    loading: state.loading,
    version: state.version,
    lastIndexed: state.indexing.lastIndexed,
    automaticIndexing: state.settings.automaticIndexing
  }),
  { index }
)(App)
