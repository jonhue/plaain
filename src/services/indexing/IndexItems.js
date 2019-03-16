class IndexItems {
  constructor(auth) {
    this._auth = auth
  }

  perform() {
    return new Promise((resolve, reject) => {
      resolve({ movies: [], shows: [] })
    })
  }

  get auth() {
    return this._auth
  }
}

export default IndexItems
