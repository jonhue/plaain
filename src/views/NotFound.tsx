import "./NotFound.scss";
import { Link } from "react-router-dom";
import React from "react";

export const NotFound = () => (
  <div className="NotFound">
    <h2>You want to get lost?</h2>
    <p>
      This path went astray... If you do want to get lost, we recommend{" "}
      <a
        href="https://www.imdb.com/title/tt6969502/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Lost! ny Mirjam de With
      </a>
      .
    </p>
    <p>
      If all you&apos;re looking for is to get back on track: you can{" "}
      <Link to="/app">find home this way</Link>.
    </p>
  </div>
);

export default NotFound;
