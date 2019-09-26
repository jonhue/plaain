import React, { Component } from 'react'
import { connect } from 'react-redux'
import FlexSearch from 'flexsearch'
import './Find.scss'

import HorizontalSlide from '../components/HorizontalSlide'

class Find extends Component {
  constructor(props) {
    super(props)

    this.moviesIndex = new FlexSearch()
    Object.values(this.props.movies)
      .map((movie) => this.moviesIndex.add(movie.id, movie.name))
    this.showsIndex = new FlexSearch()
    Object.values(this.props.shows)
      .map((show) => this.showsIndex.add(show.id, show.name))

    this.state = {
      query: this.props.match.params.query,
      movies: [],
      shows: [],
    }
  }

  componentDidMount() {
    this.search(this.props.match.params.query)
  }

  search(query) {
    this.setState({
      movies: this.moviesIndex.search(query)
        .map(result => this.props.movies[result]),
      shows: this.showsIndex.search(query)
        .map(result => this.props.shows[result])
    })
  }

  handleInputChange(event) {
    this.props.history.push(`/app/find/${event.target.value}`)
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
          <HorizontalSlide items={this.state.shows} id='shows' width='200px' />
        </section>}
      </div>
    )
  }
}

export default connect(
  state => ({
    movies: state.movies,
    shows: state.shows
  })
)(Find)
