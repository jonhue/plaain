import './index.scss'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import NotFound from '../NotFound'
import React from 'react'
import ForYou from './ForYou'
import Movies from './Movies'
import Movie from './Movie'
import Shows from './Shows'
import Show from './Show'
import Season from './Season'
import Person from './Person'
import Settings from './Settings'
import Find from './Find'
import Nav from '../../components/Nav'

type AppProps = RouteComponentProps

export const App = ({ match }: AppProps) => (
  <div className="App">
    <Switch>
      <Route path={`${match.path}/`} exact component={ForYou} />
      <Route path={`${match.path}/movies`} component={Movies} />
      <Route path={`${match.path}/movie/:id`} exact component={Movie} />
      <Route path={`${match.path}/shows`} component={Shows} />
      <Route path={`${match.path}/show/:id`} exact component={Show} />
      <Route path={`${match.path}/season/:id`} exact component={Season} />
      <Route path={`${match.path}/person/:id`} exact component={Person} />
      <Route path={`${match.path}/settings`} exact component={Settings} />
      <Route path={`${match.path}/find`} exact component={Find} />
      <Route component={NotFound} />
    </Switch>

    <Nav />
  </div>
)

export default App
