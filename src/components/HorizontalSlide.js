import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import "./HorizontalSlide.scss";

import Cover from "./Cover";

class HorizontalSlide extends Component {
  componentDidMount() {
    new Swiper(
      document.querySelector(
        `.HorizontalSlide#${this.props.id} .swiper-container`
      ),
      {
        spaceBetween: 15,
        slidesPerView: "auto",
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
        grabCursor: true,
      }
    );
  }

  render() {
    return (
      <div className="HorizontalSlide" id={this.props.id}>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {this.props.items.length ? (
              this.props.items.map((item) => {
                return (
                  <div className="swiper-slide" key={item.id}>
                    <Link to={item.path}>
                      <Cover
                        url={item.posterUrl || "/cover.png"}
                        alt={item.name}
                        width="100%"
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="swiper-slide">
                <h3>Nothing found.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HorizontalSlide;
