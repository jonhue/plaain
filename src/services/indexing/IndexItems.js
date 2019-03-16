import OneDrive from '../drives/OneDrive'

import IndexMovies from './IndexMovies'
import IndexShows from './IndexShows'

class IndexItems {
  constructor(accessToken) {
    this._oneDrive = new OneDrive(accessToken)
  }

  perform() {
    return Promise.all([
      new IndexMovies(this.oneDrive).perform().then(movies => ({ movies: Promise.all(movies).then(movies => movies.filter(movie => movie != null)) })),
      new IndexShows(this.oneDrive).perform().then(shows => ({ shows: Promise.all(shows).then(shows => shows.filter(show => show != null)) }))
    ]).then(data => Object.assign({}, data[0], data[1]))
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexItems
