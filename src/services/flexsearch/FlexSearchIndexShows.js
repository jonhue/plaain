import FlexSearch from 'flexsearch'

class FlexSearchIndexShows {
  constructor(shows) {
    this._shows = shows
    this._showsIndex = new FlexSearch()
  }

  async perform() {
    Object.values(this.shows).forEach(show => {
      this.showsIndex.add(show.id, `${show.name};${show.overview}`)
    })
    return this.showsIndex
  }

  get shows() {
    return this._shows
  }

  get showsIndex() {
    return this._showsIndex
  }
}

export default FlexSearchIndexShows
