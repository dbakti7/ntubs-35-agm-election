import React from "react";

function Card({ color }) {
  return (
    <svg width="90" height="120" viewBox="0 0 90 120">
      <rect fill={color} x="0" y="0" width="90" height="120" />
    </svg>
  );
}
export default Card;
