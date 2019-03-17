class FetchShow {
  constructor(show) {
    this._show = show
  }

  perform() {
    return new Promise((resolve, reject) => {
      resolve({...this.show})
    })
  }

  get show() {
    return this._show
  }
}

export default FetchShow
