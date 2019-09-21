import { ITEM_STATES } from '../../constants'

import TMDb from '../databases/TMDb'
import Parametrize from '../Parametrize'

class FetchMovie {
  constructor(id, name) {
    this._movie = { id, name }
    this._tmdb = new TMDb()
  }

  perform() {
    return this.tmdb.findMovie(this.movie.name).then(tmdbId => this.fetch(tmdbId))
  }

  async fetch(tmdbId) {
    this.movie.tmdbId = tmdbId

    await Promise.all([
      this.fetchDetails(),
      this.fetchCredits()
    ])

    return this.movie
  }

  fetchDetails() {
    return this.tmdb.movie(this.movie.tmdbId)
      .then(response => {
        this.movie.state = ITEM_STATES.FETCHED
        this.movie.backdropUrl = `https://image.tmdb.org/t/p/original${response.backdrop_path}`
        this.movie.overview = response.overview
        this.movie.posterUrl = `https://image.tmdb.org/t/p/original${response.poster_path}`
        this.movie.releaseDate = response.release_date
        this.movie.runtime = response.runtime
        this.movie.name = response.title
        this.movie.trailerLink = `https://www.youtube.com/results?search_query=${new Parametrize(this.movie.name).perform()}+official+trailer`
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
}

export default FetchMovie
