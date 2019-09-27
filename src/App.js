import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.scss'

import { index } from './actions/indexing'

import AutomaticIndexing from './services/AutomaticIndexing'
import IndexAfterUpdate from './services/IndexAfterUpdate'
import MicrosoftAuth from './services/auth/MicrosoftAuth'

import ForYou from './scenes/ForYou'
import Movies from './scenes/Movies'
import Movie from './scenes/Movie'
import Shows from './scenes/Shows'
import Settings from './scenes/Settings'
import Find from './scenes/Find'
import Loading from './scenes/Loading'
import NotFound from './scenes/NotFound'

import Nav from './components/Nav'

import { authError } from './selectors/auth'

class App extends Component {
  constructor(props) {
    super(props)

    // this is required for the login popup to close;
    // see https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/174
    new MicrosoftAuth()
  }

  componentDidMount() {
    new IndexAfterUpdate(this.props.version, this.props.index).perform() ||
      new AutomaticIndexing(
        this.props.automaticIndexing,
        this.props.lastIndexed,
        this.props.index
      ).perform()
  }

  componentDidUpdate() {
    new IndexAfterUpdate(this.props.version, this.props.index).perform()
  }

  render() {
    if (this.props.loading) {
      return <Loading caption={this.props.loading} />
    } else {
      return (
        <div className='App'>
          {authError()({ auth: this.props.auth }) && <Redirect to={`${this.props.match.path}/settings`} />}

          <Switch>
            <Route path={`${this.props.match.path}/`} exact component={ForYou} />
            <Route path={`${this.props.match.path}/movies`} component={Movies} />
            <Route path={`${this.props.match.path}/movie/:id`} exact component={Movie} />
            <Route path={`${this.props.match.path}/shows`} component={Shows} />
            <Route path={`${this.props.match.path}/settings`} exact component={Settings} />
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
    auth: state.auth,
    lastIndexed: state.indexing.lastIndexed,
    automaticIndexing: state.settings.automaticIndexing
  }),
  { index }
)(App)
