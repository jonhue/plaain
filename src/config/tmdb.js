const tmdb_options = {
  qs: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: 'en-US'
  },
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
}

const tmdb_base_uri = 'https://api.themoviedb.org/3'

export { tmdb_options, tmdb_base_uri }
