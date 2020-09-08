import React, { Component } from "react";
import { connect } from "react-redux";
import FlexSearch from "flexsearch";
import "./Find.scss";

import HorizontalSlide from "../components/HorizontalSlide";

class Find extends Component {
  constructor(props) {
    super(props);

    this.moviesIndex = new FlexSearch();
    Object.values(this.props.movies).forEach((movie) => {
      this.moviesIndex.add(movie.id, `${movie.name};${movie.overview}`);
    });
    this.showsIndex = new FlexSearch();
    Object.values(this.props.shows).forEach((show) => {
      this.showsIndex.add(show.id, `${show.name};${show.overview}`);
    });

    this.state = {
      query: new URLSearchParams(this.props.location.search).get("q") || "",
      movies: [],
      shows: [],
    };
  }

  componentDidMount() {
    this.search(new URLSearchParams(this.props.location.search).get("q"));
  }

  search(query) {
    this.setState({
      query: query || "",
      movies: this.moviesIndex
        .search(query || "")
        .map((result) => this.props.movies[result]),
      shows: this.showsIndex
        .search(query || "")
        .map((result) => this.props.shows[result]),
    });
  }

  handleInputChange(event) {
    this.props.history.replace(`/app/find?q=${event.target.value}`);
    this.search(event.target.value);
  }

  render() {
    return (
      <div className="Find">
        <form>
          <input
            autoFocus
            value={this.state.query}
            placeholder="Search your library"
            onChange={this.handleInputChange.bind(this)}
          />
        </form>

        {this.state.movies.length > 0 && (
          <section>
            <h2>Movies</h2>
            <HorizontalSlide items={this.state.movies} id="movies" />
          </section>
        )}

        {this.state.shows.length > 0 && (
          <section>
            <h2>TV shows</h2>
            <HorizontalSlide items={this.state.shows} id="shows" />
          </section>
        )}
      </div>
    );
  }
}

export default connect((state) => ({
  movies: state.movies,
  shows: state.shows,
}))(Find);
