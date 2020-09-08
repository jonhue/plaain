import TMDb from "../databases/TMDb";

class FetchEpisode {
  constructor(showId, showName, seasonNumber, seasonName, episode) {
    this._show = { id: showId, name: showName };
    this._season = { seasonNumber, name: seasonName };
    this._episode = episode;
    this._tmdb = new TMDb();
  }

  async perform() {
    this.episode.id =
      `${this.show.id}-${this.season.seasonNumber}-` +
      `${this.episode.episodeNumber}`;

    await Promise.all([this.fetchDetails()]);

    return this.episode;
  }

  fetchDetails() {
    return this.tmdb
      .episode(
        this.show.id,
        this.season.seasonNumber,
        this.episode.episodeNumber
      )
      .then((response) => {
        this.episode.airDate = response.air_date;
        this.episode.name = response.name;
        this.episode.overview = response.overview;
      });
  }

  get show() {
    return this._show;
  }

  get season() {
    return this._season;
  }

  get episode() {
    return this._episode;
  }

  get tmdb() {
    return this._tmdb;
  }
}

export default FetchEpisode;
