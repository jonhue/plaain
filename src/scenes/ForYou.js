import React, { Component } from 'react'
import { connect } from 'react-redux'
// import './ForYou.scss'

import ItemList from '../components/ItemList'

class ForYou extends Component {
  render() {
    return (
      <div className='ForYou'>
        <ItemList items={Object.values(this.props.movies)} itemHeight={360} itemWidth={240} />
      </div>
    )
  }
}

export default connect(
  state => ({
    movies: state.movies
  })
)(ForYou)
