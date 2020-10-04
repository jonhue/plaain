import './index.scss'
import { ConnectedProps, connect } from 'react-redux'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import Find from './Find'
import Home from './Home'
import Movie from './Movie'
import Movies from './Movies'
import Nav from '../../components/Nav'
import NotFound from '../NotFound'
import Person from './Person'
import React from 'react'
import { RootState } from '../../store'
import Season from './Season'
import Settings from './Settings'
import Show from './Show'
import Shows from './Shows'

const mapState = (state: RootState) => ({
  moviesCount: Object.keys(state.movies).length,
  showsCount: Object.keys(state.shows).length,
})

const connector = connect(mapState)

type AppProps = ConnectedProps<typeof connector> & RouteComponentProps

const App = ({ match, moviesCount, showsCount }: AppProps) => (
  <div className="App">
    <Switch>
      <Route path={`${match.path}/`} exact component={Home} />
      <Route path={`${match.path}/movies`} component={Movies} />
      <Route path={`${match.path}/movies/:id`} exact component={Movie} />
      <Route path={`${match.path}/shows`} component={Shows} />
      <Route path={`${match.path}/shows/:id`} exact component={Show} />
      <Route path={`${match.path}/seasons/:id`} exact component={Season} />
      <Route path={`${match.path}/persons/:id`} exact component={Person} />
      <Route path={`${match.path}/settings`} exact component={Settings} />
      <Route path={`${match.path}/find`} exact component={Find} />
      <Route component={NotFound} />
    </Switch>

    <Nav moviesDisabled={moviesCount === 0} showsDisabled={showsCount === 0} />
  </div>
)

export default connector(App)
