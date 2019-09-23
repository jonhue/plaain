import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import './Welcome.scss'

class Welcome extends Component {
  render() {
    return (
      <div className='Welcome'>
        <Link to='/app' className='button primary'>Launch</Link>
      </div>
    )
  }
}

export default Welcome
