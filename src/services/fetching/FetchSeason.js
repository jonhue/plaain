import { ITEM_STATES } from '../../constants'

import TMDb from '../databases/TMDb'
import Parametrize from '../Parametrize'

class FetchSeason {
  constructor(showTmdbId, showName, id, seasonNumber) {
    this._show = { tmdbId: showTmdbId, name: showName }
    this._season = { id, seasonNumber }
    this._tmdb = new TMDb()
  }

  async perform() {
    await Promise.all([
      this.fetchDetails(),
      this.fetchCredits()
    ])

    return this.season
  }

  fetchDetails() {
    return this.tmdb.season(this.show.tmdbId, this.season.seasonNumber)
      .then(response => {
        this.season.state = ITEM_STATES.FETCHED
        this.season.airDate = response.air_date
        this.season.name = response.name
        this.season.overview = response.overview
        this.season.posterUrl =
          `https://image.tmdb.org/t/p/original${response.poster_path}`
        this.season.trailerLink =
          'https://www.youtube.com/results?search_query=' +
          `${new Parametrize(this.show.name).perform()}+` +
          `${new Parametrize(this.season.name).perform()}+` +
          'official+trailer&i=movies-tv'
      })
  }

  fetchCredits() {
    return this.tmdb.seasonCredits(this.show.tmdbId, this.season.seasonNumber)
      .then(response => {
        this.season.cast = response.cast.map(castMember => ({
          id: castMember.id,
          character: castMember.character,
          name: castMember.name,
          profileUrl: `https://image.tmdb.org/t/p/original${castMember.profile_path}`
        }))
        this.season.crew = response.crew.map(crewMember => ({
          id: crewMember.id,
          job: crewMember.job,
          name: crewMember.name,
          profileUrl: `https://image.tmdb.org/t/p/original${crewMember.profile_path}`
        }))
      })
  }

  get show() {
    return this._show
  }

  get season() {
    return this._season
  }

  get tmdb() {
    return this._tmdb
  }
}

export default FetchSeason
