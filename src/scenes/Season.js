import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Season.scss'

import { FILE_TYPES } from '../constants'

import NotFound from './NotFound'

import Cover from '../components/Cover'
import PersonList from '../components/PersonList'
import PlyrPlayer from '../components/PlyrPlayer'

import { updateSeason } from '../actions/seasons'
import { updateEpisode } from '../actions/episodes'

import { showSelector } from '../selectors/shows'
import { seasonSelector } from '../selectors/seasons'
import { episodesBySeasonSelector } from '../selectors/episodes'

class Season extends Component {
  constructor(props) {
    super(props)

    this.state = {
      season: seasonSelector(this.props.match.params.id)({
        seasons: this.props.seasons
      }),
      episodes: episodesBySeasonSelector(this.props.match.params.id)({
        episodes: this.props.episodes
      }),
      watchableEpisodes: episodesBySeasonSelector(this.props.match.params.id)({
        episodes: this.props.episodes
      }).filter(episode => {
        return episode.files.filter(file => file.type === FILE_TYPES.SOURCE)
          .length !== 0
      }),
      episodesWrapped: true
    }
    this.state.currentEpisodeNumber =
      this.state.watchableEpisodes.length > 0 &&
      this.state.watchableEpisodes[0].episodeNumber
  }

  componentDidMount() {
    document.querySelector('.Nav a:nth-child(3)').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:nth-child(3)').classList.remove('active')
  }

  toggleEpisodes() {
    this.setState({
      episodesWrapped: !this.state.episodesWrapped
    })
  }

  continue() {
    this.watch(this.state.season.progress, this.state.episodes[this.state.season.progress - 1].progress)
  }

  watch(episodeNumber, progress = 0) {
    this.setState({
      currentEpisodeNumber: episodeNumber
    })

    this.props.updateSeason({
      id: this.state.season.id,
      lastWatched: new Date().getTime(),
      progress: episodeNumber
    })

    const player = document.querySelector('.PlyrPlayer')
    const plyr = player.querySelector('#player').plyr
    // Wait until Plyr is ready to start playing after the sources changed
    setTimeout(() => {
      player.style.display = 'block'
      plyr.fullscreen.enter()
      plyr.play()
      plyr.currentTime = progress
    }, 100)
  }

  stoppedEpisode() {
    // this.forceUpdate()
  }

  finishedEpisode() {
    this.props.updateEpisode({
      id: this.state.episodes[this.state.currentEpisodeNumber - 1].id,
      progress: 0
    })

    let episodeNumber = 0
    if (this.state.episodes[this.state.currentEpisodeNumber].files.filter(file => file.type === FILE_TYPES.SOURCE).length > 0) {
      episodeNumber = this.state.currentEpisodeNumber + 1
    }

    this.props.updateSeason({
      id: this.state.season.id,
      progress: episodeNumber
    })

    // this.forceUpdate()
  }

  render() {
    if (this.state.season) {
      return (
        <div className='Season'>
          {this.state.watchableEpisodes.length > 0 && <PlyrPlayer item={this.state.episodes[this.state.currentEpisodeNumber - 1]} updateItemAction={this.props.updateEpisode} exitedAction={this.stoppedEpisode.bind(this)} endedAction={this.finishedEpisode.bind(this)} />}
          <img className='Show__backdrop' src={showSelector(this.state.season.showId)({ shows: this.props.shows }).backdropUrl} alt='backdrop' />
          <div className='Season__details'>
            <Cover url={this.state.season.posterUrl} alt='poster' width='50%' />
            <h1>Season {this.state.season.seasonNumber}</h1>
            <div className='Season__information'>
              <p className='small'>{showSelector(this.state.season.showId)({ shows: this.props.shows }).name}</p>
              <p className='small'>{new Date(this.state.season.airDate).getFullYear()}</p>
            </div>
            <div className='Season__actions'>
              {this.state.watchableEpisodes.length > 0 && this.state.season.progress !== 0 && <button className='primary' id='continue' onClick={this.continue.bind(this)}>Continue episode {this.state.season.progress}</button>}
              {this.state.watchableEpisodes.length > 0 && this.state.season.progress !== 1 && <button className={this.state.season.progress === 0 ? 'primary' : ''} id='watch' onClick={() => this.watch(this.state.watchableEpisodes[0].episodeNumber)}>Watch episode {this.state.watchableEpisodes[0].episodeNumber}</button>}
              <a className='button' id='trailer' href={this.state.season.trailerLink} target='_blank' rel='noopener noreferrer'>Play trailer</a>
            </div>
            <div className='Season__episodes'>
              {this.state.episodes
                .slice(
                  0,
                  this.state.episodesWrapped ? 0 : this.state.episodes.length
                )
                .map((episode, index) => {
                  return (
                    <div disabled={this.state.episodes[episode.episodeNumber - 1].files.length === 0} className='Season__episodes__episode' onClick={() => this.watch(episode.episodeNumber)} key={index}>
                      <div className='Season__episodes__episode__number'>{episode.episodeNumber}</div>
                      <div className='Season__episodes__episode__details'>
                        <h2>{episode.name}</h2>
                        <p className='small'>Aired {new Date(episode.airDate).toDateString()}</p>
                        <p>{episode.overview}</p>
                      </div>
                    </div>
                  )
                })}
              {this.state.episodes.length > 0 && <span onClick={this.toggleEpisodes.bind(this)}>{this.state.episodesWrapped ? 'Show all episodes' : 'Hide episodes'}</span>}
            </div>
            <p className='Season__overview'>{this.state.season.overview}</p>
            <div className='Season__cast'>
              <h4>Starring</h4>
              <PersonList people={this.state.season.cast} attribute='character' />
            </div>
            <div className='Season__crew'>
              <h4>Crew</h4>
              <PersonList people={this.state.season.crew} attribute='job' />
            </div>
          </div>
        </div>
      )
    } else {
      return <NotFound />
    }
  }
}

export default connect(
  state => ({
    shows: state.shows,
    seasons: state.seasons,
    episodes: state.episodes
  }),
  { updateSeason, updateEpisode }
)(Season)
