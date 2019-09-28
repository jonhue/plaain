import FlexSearch from 'flexsearch'

class FlexSearchIndexMovies {
  constructor(movies) {
    this._movies = movies
    this._moviesIndex = new FlexSearch()
  }

  async perform() {
    Object.values(this.movies).forEach(movie => {
      this.moviesIndex.add(movie.id, `${movie.name};${movie.overview}`)
    })
    return this.moviesIndex
  }

  get movies() {
    return this._movies
  }

  get moviesIndex() {
    return this._moviesIndex
  }
}

export default FlexSearchIndexMovies
