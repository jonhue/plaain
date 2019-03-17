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

  movie(id) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/movie/${id}`})
  }

  movieCredits(id) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/movie/${id}/credits`})
  }

  movieVideos(id) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/movie/${id}/videos`})
  }

  show(id) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/tv/${id}`})
  }

  season(showId, seasonNumber) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/tv/${showId}/season/${seasonNumber}`})
  }

  episode(showId, seasonNumber, episodeNumber) {
    return rp({...TMDb.config, uri: `${TMDb.base_uri}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}`})
  }
}

export default TMDb
