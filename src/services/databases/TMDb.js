const rp = require('request-promise')

class TMDb {
  static config = {
    qs: {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
      language: 'en-US'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }

  static base_uri = 'https://api.themoviedb.org/3'

  async findMovie(query) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/search/movie`, qs: {...TMDb.config.qs, query}}).then(response => {
      if (response.results.length < 1) {
        return null
      }

      return response.results[0].id
    })
  }

  async findShow(query) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/search/tv`, qs: {...TMDb.config.qs, query}}).then(response => {
      if (response.results.length < 1) {
        return null
      }

      return response.results[0].id
    })
  }

  async movie(id) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/movie/${id}`})
  }

  async movieCredits(id) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/movie/${id}/credits`})
  }

  async show(id) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/tv/${id}`})
  }

  async season(showId, seasonNumber) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/tv/${showId}/season/${seasonNumber}`})
  }

  async seasonCredits(showId, seasonNumber) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/tv/${showId}/season/${seasonNumber}/credits`})
  }

  async episode(showId, seasonNumber, episodeNumber) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}`})
  }
}

export default TMDb
