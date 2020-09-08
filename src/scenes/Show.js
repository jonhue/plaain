import React, { Component } from "react";
import { connect } from "react-redux";
import "./Show.scss";

import NotFound from "./NotFound";

import Backdrop from "../components/Backdrop";
import Cover from "../components/Cover";
import HorizontalSlide from "../components/HorizontalSlide";

import { showSelector } from "../selectors/shows";
import { seasonsByShowSelector } from "../selectors/seasons";

class Show extends Component {
  componentDidMount() {
    document.querySelector(".Nav a:nth-child(3)").classList.add("active");
  }

  componentWillUnmount() {
    document.querySelector(".Nav a:nth-child(3)").classList.remove("active");
  }

  render() {
    const show = showSelector(this.props.match.params.id)({
      shows: this.props.shows,
    });
    const seasons = seasonsByShowSelector(this.props.match.params.id)({
      seasons: this.props.seasons,
    });

    if (show) {
      return (
        <div className="Show">
          <Backdrop url={show.backdropUrl} />
          <div className="Show__details">
            <Cover url={show.posterUrl} alt="poster" width="50%" />
            <h1>{show.name}</h1>
            <div className="Show__information">
              <p className="small">
                {new Date(show.firstAirDate).getFullYear()} -{" "}
                {new Date(show.lastAirDate).getFullYear()}
              </p>
            </div>
            <p className="Show__overview">{show.overview}</p>
          </div>
          {seasons.length > 0 && (
            <div className="Show__seasons">
              <h2>Seasons</h2>
              <HorizontalSlide
                items={seasons.sort((a, b) =>
                  a.seasonNumber < b.seasonNumber ? -1 : 1
                )}
                id="seasons"
              />
            </div>
          )}
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}

export default connect((state) => ({
  shows: state.shows,
  seasons: state.seasons,
}))(Show);
