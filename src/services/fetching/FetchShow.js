import TMDb from "../databases/TMDb";

class FetchShow {
  constructor(show) {
    this._show = show;
    this._tmdb = new TMDb();
  }

  perform() {
    return this.tmdb.findShow(this.show.name).then((id) => this.fetch(id));
  }

  async fetch(id) {
    this.show.id = id;
    this.show.path = `/app/show/${this.show.id}`;

    if (this.show.id === null) {
      return;
    }

    await Promise.all([this.fetchDetails()]);

    return this.show;
  }

  fetchDetails() {
    return this.tmdb.show(this.show.id).then((response) => {
      this.show.backdropUrl = `https://image.tmdb.org/t/p/original${response.backdrop_path}`;
      this.show.firstAirDate = response.first_air_date;
      this.show.lastAirDate = response.last_air_date;
      this.show.name = response.name;
      this.show.overview = response.overview;
      this.show.posterUrl = `https://image.tmdb.org/t/p/original${response.poster_path}`;
    });
  }

  get show() {
    return this._show;
  }

  get tmdb() {
    return this._tmdb;
  }
}

export default FetchShow;
