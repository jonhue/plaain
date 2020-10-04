import './index.scss'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import Find from './Find'
import Home from './Home'
import Movie from './Movie'
import Movies from './Movies'
import Nav from '../../components/Nav'
import NotFound from '../NotFound'
import Person from './Person'
import React from 'react'
import Season from './Season'
import Settings from './Settings'
import Show from './Show'
import Shows from './Shows'

type AppProps = RouteComponentProps

const App = ({ match }: AppProps) => (
  <div className="App">
    <Switch>
      <Route path={`${match.path}/`} exact component={Home} />
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
