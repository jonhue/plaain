import TMDb from '../databases/TMDb'

class FetchMovie {
  constructor(movie) {
    this._movie = {...movie}
    this._tmdb = new TMDb()
  }

  perform() {
    return this.tmdb.findMovie(this.movie.name).then(tmdbId => {
      this.movie.tmdbId = tmdbId

      this.fetch()

      return this.movie
    })
  }

  async fetch() {
    await Promise.all([
      this.fetchDetails(),
      this.fetchCredits()
    ])
  }

  fetchDetails() {
    return this.tmdb.movie(this.movie.tmdbId)
      .then(response => {
        this.movie.backdropUrl = `https://image.tmdb.org/t/p/original${response.backdrop_path}`
        this.movie.overview = response.overview
        this.movie.posterUrl = `https://image.tmdb.org/t/p/original${response.poster_path}`
        this.movie.releaseDate = response.release_date
        this.movie.runtime = response.runtime
        this.movie.name = response.title
        this.movie.affiliateLink = `https://www.amazon.com/s?k=${FetchMovie.parametrize(this.movie.name)}&i=movies-tv`
        this.movie.trailerLink = `https://www.youtube.com/results?search_query=${FetchMovie.parametrize(this.movie.name)}+official+trailer`
      })
  }

  fetchCredits() {
    return this.tmdb.movieCredits(this.movie.tmdbId)
      .then(response => {
        this.movie.cast = response.cast.map(cast_member => ({
          character: cast_member.character,
          name: cast_member.name
        }))
        this.movie.crew = response.crew.map(crew_member => ({
          job: crew_member.job,
          name: crew_member.name
        }))
      })
  }

  get movie() {
    return this._movie
  }

  get tmdb() {
    return this._tmdb
  }

  static parametrize(string) {
    return string.toLowerCase().replace(/\s/g, '+')
  }
}

export default FetchMovie
