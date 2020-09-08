import "./Welcome.scss";
import { Link } from "react-router-dom";
import React from "react";

export const Welcome = () => (
  <div className="Welcome">
    <h1>Your movies & TV shows. Anywhere.</h1>
    <div className="Welcome__details">
      <h3>
        Plaain lets you stream and maintain your media library from anywhere. No
        server needed, no fee required.
      </h3>
      <Link to="/app" className="button primary">
        Launch
      </Link>
      <a
        href="https://github.com/jonhue/plaain#getting-started"
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        How it works
      </a>
    </div>
  </div>
);

export default Welcome;
