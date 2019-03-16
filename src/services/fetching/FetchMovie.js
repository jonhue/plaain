class FetchMovie {
  constructor(movie) {
    this._movie = movie
  }

  perform() {
    return new Promise((resolve, reject) => {
      resolve({...this.movie})
    })
  }

  get movie() {
    return this._movie
  }
}

export default FetchMovie
