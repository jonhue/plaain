import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Settings.scss'

import { authenticateMicrosoft } from '../actions/auth'
import { index } from '../actions/indexing'

import DropboxIcon from '../components/Nucleo/icons/dropbox.jsx'
import GoogleIcon from '../components/Nucleo/icons/google.jsx'
import MicrosoftIcon from '../components/Nucleo/icons/microsoft.jsx'

class Settings extends Component {
  componentDidMount() {
    document.querySelector('.Nav a:last-child').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:last-child').classList.remove('active')
  }

  render() {
    return (
      <div className='Settings'>
        <section className='auth'>
          <button className={`microsoft ${this.props.auth.microsoft.token && 'active'}`} onClick={this.props.authenticateMicrosoft}>
            <MicrosoftIcon width={24} height={24} />
          </button>
          <button disabled className='dropbox'>
            <DropboxIcon width={24} height={24} />
          </button>
          <button disabled className='google'>
            <GoogleIcon width={24} height={24} />
          </button>
        </section>

        <section className='indexing'></section>

        <section className='version'></section>
      </div>
    )
  }
}

export default connect(
  state => ({
    auth: state.auth,
    settings: state.settings
  }),
  { authenticateMicrosoft, index }
)(Settings)
