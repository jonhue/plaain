import { tmdb_options, tmdb_base_uri } from './../../config/tmdb'

const rp = require('request-promise')

class GetSeason {
  constructor(show_id, season_number) {
    this._show_id = show_id
    this._season_number = season_number
  }

  perform() {
    return rp({...tmdb_options, uri: `${tmdb_base_uri}/tv/${this.showId}/season/${this.seasonNumber}`})
  }

  get seasonNumber() {
    return this._season_number
  }

  get showId() {
    return this._show_id
  }
}

export default GetSeason
