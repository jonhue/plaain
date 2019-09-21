import React, { Component } from 'react'
// import './Loading.scss'

import LoaderIcon from './Nucleo/icons/loader.jsx'

class Loading extends Component {
  render() {
    return (
      <div className='Loading'>
        <LoaderIcon width={64} height={64} />
      </div>
    )
  }
}

export default Loading
