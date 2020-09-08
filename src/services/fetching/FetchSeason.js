import TMDb from '../databases/TMDb'
import Parametrize from '../Parametrize'

class FetchSeason {
  constructor(showId, showName, season) {
    this._show = { id: showId, name: showName }
    this._season = season
    this._tmdb = new TMDb()
  }

  async perform() {
    this.season.id = `${this.show.id}-${this.season.seasonNumber}`
    this.season.path = `/app/season/${this.season.id}`

    await Promise.all([this.fetchDetails(), this.fetchCredits()])

    return this.season
  }

  fetchDetails() {
    return this.tmdb
      .season(this.show.id, this.season.seasonNumber)
      .then((response) => {
        this.season.airDate = response.air_date
        this.season.name = response.name
        this.season.overview = response.overview
        this.season.posterUrl = `https://image.tmdb.org/t/p/original${response.poster_path}`
        this.season.trailerLink =
          'https://www.youtube.com/results?search_query=' +
          `${new Parametrize(this.show.name).perform()}+` +
          `${new Parametrize(this.season.name).perform()}+` +
          'official+trailer&i=movies-tv'
      })
  }

  fetchCredits() {
    return this.tmdb
      .seasonCredits(this.show.id, this.season.seasonNumber)
      .then((response) => {
        this.season.cast = response.cast.map((castMember) => ({
          id: castMember.id,
          character: castMember.character,
          name: castMember.name,
          gender: castMember.gender,
          profileUrl: `https://image.tmdb.org/t/p/original${castMember.profile_path}`,
        }))
        this.season.crew = response.crew.map((crewMember) => ({
          id: crewMember.id,
          job: crewMember.job,
          name: crewMember.name,
          gender: crewMember.gender,
          profileUrl: `https://image.tmdb.org/t/p/original${crewMember.profile_path}`,
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
