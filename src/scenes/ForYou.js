import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ForYou.scss'

import ItemList from '../components/ItemList'

class ForYou extends Component {
  componentDidMount() {
    document.querySelector('.Nav a:first-child').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:first-child').classList.remove('active')
  }

  render() {
    return (
      <div className='ForYou'>
        <h1>Movies</h1>
        <ItemList items={Object.values(this.props.movies)} id={'movies'} />

        <h1>Shows</h1>
        <ItemList items={Object.values(this.props.shows)} id={'shows'} />
      </div>
    )
  }
}

export default connect(
  state => ({
    movies: state.movies,
    shows: state.shows
  })
)(ForYou)
