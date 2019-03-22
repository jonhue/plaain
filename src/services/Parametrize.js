class Parametrize {
  constructor(string) {
    this._string = string
  }

  perform() {
    return this.string.toLowerCase().replace(/\s/g, '+')
  }

  get string() {
    return this._string
  }
}

export default Parametrize
