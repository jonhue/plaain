import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Find.scss'

import { flexsearchIndex } from '../actions/flexsearch'

import HorizontalSlide from '../components/HorizontalSlide'

import { personSelector } from '../selectors/people'

class Find extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: new URLSearchParams(this.props.location.search).get('q') || '',
      movies: [],
      shows: [],
      people: []
    }
  }

  componentDidMount() {
    if (!this.props.flexsearch.indexed) {
      this.props.flexsearchIndex()
    } else {
      console.log(this.props.flexsearch.indexed)
      this.search(new URLSearchParams(this.props.location.search).get('q'))
    }
  }

  search(query) {
    this.setState({
      query: query || '',
      movies: this.props.flexsearch.movies.search(query || '')
        .map(result => this.props.movies[result]),
      shows: this.props.flexsearch.shows.search(query || '')
        .map(result => this.props.shows[result]),
      people: this.props.flexsearch.people.search(query || '')
        .map(result => personSelector(result)({
          movies: this.props.movies,
          seasons: this.props.seasons
        }))
    })
  }

  handleInputChange(event) {
    this.props.history.replace(`/app/find?q=${event.target.value}`)
    this.search(event.target.value)
  }

  render() {
    return (
      <div className='Find'>
        <form>
          <input autoFocus value={this.state.query} placeholder="Search your library" onChange={this.handleInputChange.bind(this)} />
        </form>

        {this.state.movies.length > 0 && <section>
          <h2>Movies</h2>
          <HorizontalSlide items={this.state.movies} id='movies' width='200px' />
        </section>}

        {this.state.shows.length > 0 && <section>
          <h2>TV shows</h2>
          <HorizontalSlide items={this.state.shows} path='show' id='shows' width='200px' />
        </section>}

        {this.state.people.length > 0 && <section>
          <h2>People</h2>
          <HorizontalSlide items={this.state.people.slice(0, 25)} path='person' coverAttribute='profileUrl' id='people' width='200px' />
        </section>}
      </div>
    )
  }
}

export default connect(
  state => ({
    movies: state.movies,
    shows: state.shows,
    seasons: state.seasons,
    flexsearch: state.flexsearch
  }),
  { flexsearchIndex }
)(Find)
