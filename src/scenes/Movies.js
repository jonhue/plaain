import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import './Movies.scss'

import Movie from './Movies/Movie'

import VerticalSlide from '../components/VerticalSlide'
import ZoomIcon from '../components/Nucleo/icons/zoom.jsx'

class Movies extends Component {
  componentDidMount() {
    document.querySelector('.Nav a:nth-child(2)').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:nth-child(2)').classList.remove('active')
  }

  render() {
    return (
      <div className='Movies'>
        <Route path={`${this.props.match.path}/:id`} component={Movie}/>
        <Route
          exact
          path={this.props.match.path}
          render={() => (
            <div className='Movies__index'>
              <div className='Movies__index__find'>
                <Link to='/app/find'>
                  <ZoomIcon width={24} height={24} />
                </Link>
              </div>
              <VerticalSlide items={Object.values(this.props.movies)} id='movies' />
            </div>
          )} />
      </div>
    )
  }
}

export default connect(
  state => ({
    movies: state.movies
  })
)(Movies)
