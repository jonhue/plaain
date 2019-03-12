class Video {
  constructor(poster, sources = [], captions = [], time = 0) {
    this._poster = poster
    this._sources = sources
    this._captions = captions
    this._time = time
  }

  get poster() {
    return this._poster
  }

  get sources() {
    return this._sources
  }

  get captions() {
    return this._captions
  }

  get time() {
    return this._time
  }

  set time(time) {
    this._time = time
  }
}

export default Video
