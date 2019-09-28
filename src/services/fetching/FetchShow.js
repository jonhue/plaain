import { ITEM_STATES } from '../../constants'

import TMDb from '../databases/TMDb'

class FetchShow {
  constructor(id, name) {
    this._show = { id, name }
    this._tmdb = new TMDb()
  }

  perform() {
    return this.tmdb.findShow(this.show.name).then(tmdbId => this.fetch(tmdbId))
  }

  async fetch(tmdbId) {
    this.show.tmdbId = tmdbId

    if (this.show.tmdbId === null) {
      return
    }

    await Promise.all([
      this.fetchDetails()
    ])

    return this.show
  }

  fetchDetails() {
    return this.tmdb.show(this.show.tmdbId)
      .then(response => {
        this.show.state = ITEM_STATES.FETCHED
        this.show.backdropUrl =
          `https://image.tmdb.org/t/p/original${response.backdrop_path}`
        this.show.firstAirDate = response.first_air_date
        this.show.lastAirDate = response.last_air_date
        this.show.name = response.name
        this.show.overview = response.overview
        this.show.posterUrl =
          `https://image.tmdb.org/t/p/original${response.poster_path}`
      })
  }

  get show() {
    return this._show
  }

  get tmdb() {
    return this._tmdb
  }
}

export default FetchShow
