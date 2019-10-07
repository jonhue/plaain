import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Show.scss'

import NotFound from './NotFound'

import Cover from '../components/Cover'
import HorizontalSlide from '../components/HorizontalSlide'

import { showSelector } from '../selectors/shows'
import { seasonsByShowSelector } from '../selectors/seasons'

class Show extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: showSelector(this.props.match.params.id)({
        shows: this.props.shows
      }),
      seasons: seasonsByShowSelector(this.props.match.params.id)({
        seasons: this.props.seasons
      })
    }
  }

  componentDidMount() {
    document.querySelector('.Nav a:nth-child(3)').classList.add('active')
  }

  componentWillUnmount() {
    document.querySelector('.Nav a:nth-child(3)').classList.remove('active')
  }

  render() {
    if (this.state.show) {
      return (
        <div className='Show'>
          <img className='Show__backdrop' src={this.state.show.backdropUrl} alt='backdrop' />
          <div className='Show__details'>
            <Cover url={this.state.show.posterUrl} alt='poster' width='50%' />
            <h1>{this.state.show.name}</h1>
            <div className='Show__information'>
              <p className='small'>{new Date(this.state.show.firstAirDate).getFullYear()} - {new Date(this.state.show.lastAirDate).getFullYear()}</p>
            </div>
            <p className='Show__overview'>{this.state.show.overview}</p>
          </div>
          {this.state.seasons.length > 0 && <div className='Show__seasons'>
            <h2>Seasons</h2>
            <HorizontalSlide items={this.state.seasons.sort((a, b) => (a.seasonNumber < b.seasonNumber) ? -1 : 1)} id='seasons' />
          </div>}
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
    seasons: state.seasons
  })
)(Show)
