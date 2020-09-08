import React from "react";

export default (props) => (
  <svg
    height={props.height}
    width={props.width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>popcorn</title>
    <g fill="#ffffff">
      <polygon
        fill="none"
        points="21 7 3 7 5 23 19 23 21 7"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M19,5a3,3,0,0,0-3-3,2.97,2.97,0,0,0-1.47.4,2.986,2.986,0,0,0-5.06,0A2.97,2.97,0,0,0,8,2,3,3,0,0,0,5,5"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <line
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeWidth="2"
        x1="9"
        x2="8"
        y1="23"
        y2="7"
      />
      <line
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeWidth="2"
        x1="15"
        x2="16"
        y1="23"
        y2="7"
      />
    </g>
  </svg>
);
