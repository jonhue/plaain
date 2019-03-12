class Source {
  constructor(src, type, size = 1080) {
    this._src = src
    this._type = type
    this._size = size
  }

  get src() {
    return this._src
  }

  get type() {
    return this._type
  }

  get size() {
    return this._size
  }
}

export default Source
