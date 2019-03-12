import { tmdb_options, tmdb_base_uri } from './../../config/tmdb'

const rp = require('request-promise')

class GetMovie {
  constructor(id) {
    this._id = id
  }

  perform() {
    return rp({...tmdb_options, uri: `${tmdb_base_uri}/movie/${this.id}`})
  }

  get id() {
    return this._id
  }
}

export default GetMovie
