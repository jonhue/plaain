import FlexSearch from 'flexsearch'

import { peopleSelector } from '../../selectors/people'

class FlexSearchIndexPeople {
  constructor(movies, seasons) {
    this._movies = movies
    this._seasons = seasons
    this._peopleIndex = new FlexSearch()
  }

  async perform() {
    peopleSelector()({
      movies: this.movies,
      seasons: this.seasons
    }).forEach(person => {
      this.peopleIndex.add(person.id, person.name)
    })
    return this.peopleIndex
  }

  get movies() {
    return this._movies
  }

  get seasons() {
    return this._seasons
  }

  get peopleIndex() {
    return this._peopleIndex
  }
}

export default FlexSearchIndexPeople
