import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Settings.scss'

import { VERSION, PROVIDERS, AUTOMATIC_INDEXING } from '../constants'

import { authenticateMicrosoft } from '../actions/auth'
import { index } from '../actions/indexing'
import { updateSettings } from '../actions/settings'

import AddIcon from '../components/Nucleo/icons/add.jsx'
import DropboxIcon from '../components/Nucleo/icons/dropbox.jsx'
import GoogleIcon from '../components/Nucleo/icons/google.jsx'
import MicrosoftIcon from '../components/Nucleo/icons/microsoft.jsx'

import Banner from '../components/Banner'

import {
  authTokenSelector,
  authError,
  authProviderError,
} from '../selectors/auth'

class Settings extends Component {
  componentDidMount() {
    document.querySelector('.Nav a:last-child').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:last-child').classList.remove('active')
  }

  index() {
    this.props.index()
  }

  handleAutomaticIndexingChange(event) {
    this.props.updateSettings({
      ...this.props.settings,
      automaticIndexing: event.target.value,
    })
  }

  render() {
    const newVersionAvailable = window.newVersionAvailable
    const notAuthenticated =
      Object.values(PROVIDERS).filter((provider) => {
        return this.props.auth[provider].token !== null
      }).length === 0
    const authenticationExpired = authError()({ auth: this.props.auth })
    const noMediaFound =
      Object.entries(this.props.movies).length === 0 &&
      Object.entries(this.props.shows).length === 0

    return (
      <div className="Settings">
        {newVersionAvailable && (
          <Banner
            title="Update available!"
            text="Restart the app to apply the changes."
          />
        )}
        {notAuthenticated && (
          <Banner
            title="Authenticate with cloud service"
            text="To get started, authenticate with the cloud service that hosts your media."
          />
        )}
        {noMediaFound && (
          <Banner
            title="No media found!"
            text="We indexed all your authenticated services, but weren't able to find any source files."
            linkText="Getting started with Plaain"
            linkUrl="https://github.com/jonhue/plaain#getting-started"
          />
        )}
        {authenticationExpired && (
          <Banner
            title="Authentication expired!"
            text="Reauthenticate with the failing service."
          />
        )}

        <section className="Settings__auth">
          <h2>Authentication</h2>
          <p>
            Sign into your cloud to add your movies and TV shows to your
            library.
          </p>
          <div className="Settings__auth__scroll">
            <div className="Settings__auth__flex">
              <button
                className={`microsoft ${
                  authTokenSelector(PROVIDERS.MICROSOFT)({
                    auth: this.props.auth,
                  }) && 'primary'
                } ${
                  authProviderError(PROVIDERS.MICROSOFT)({
                    auth: this.props.auth,
                  }) && 'warn'
                }`}
                onClick={this.props.authenticateMicrosoft}
              >
                <MicrosoftIcon width={32} height={32} />
              </button>
              <button disabled className="dropbox">
                <DropboxIcon width={32} height={32} />
              </button>
              <button disabled className="google">
                <GoogleIcon width={32} height={32} />
              </button>
              <a
                className="button"
                href="https://github.com/jonhue/plaain"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AddIcon width={32} height={32} />
              </a>
            </div>
          </div>
        </section>

        <section className="Settings__indexing">
          <h2>Indexing</h2>
          <p>
            Index to look for new media on your linked services and to fetch the
            latest metadata.
          </p>
          <button onClick={this.index.bind(this)}>Index</button>
          <h5>Automatic indexing</h5>
          <p>
            Index automatically when you launch Plaain after a given time has
            passed.
          </p>
          <select
            value={this.props.settings.automaticIndexing}
            onChange={this.handleAutomaticIndexingChange.bind(this)}
          >
            <option value={AUTOMATIC_INDEXING.NEVER}>Never</option>
            <option value={AUTOMATIC_INDEXING.MONTHLY}>Monthly</option>
            <option value={AUTOMATIC_INDEXING.DAILY}>Daily</option>
            <option value={AUTOMATIC_INDEXING.ALWAYS}>Always</option>
          </select>
        </section>

        <section className="Settings__version">
          <h2>Version</h2>
          <p>
            Plaain {VERSION}
            {!window.newVersionAvailable && ' (latest)'}.
          </p>
          <p className="small">
            Plaain is{' '}
            <a
              href="https://github.com/jonhue/plaain"
              target="_blank"
              rel="noopener noreferrer"
            >
              open-source
            </a>
            . See the{' '}
            <a
              href="https://github.com/jonhue/plaain/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              changelog
            </a>
            .
          </p>
          <p className="small">
            Note that Plaain may <span className="bold">not</span> be used to
            stream pirated content or publicly share your private media library.
            You may only connect to your private cloud storage.
          </p>
        </section>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
    settings: state.settings,
    movies: state.movies,
    shows: state.shows,
  }),
  { authenticateMicrosoft, index, updateSettings },
)(Settings)
