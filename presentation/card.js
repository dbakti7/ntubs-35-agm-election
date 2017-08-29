import React from 'react'

const niceColorMapping = {
  green: '#2ECC40',
  blue: '#0074D9',
  yellow: '#FFDC00',
  red: '#FF4136',
  black: '#111111'
}

function Card({ color }) {
  const fillColor = niceColorMapping[color] || color
  return (
    <svg width="90" height="120" viewBox="0 0 90 120">
      <rect fill={fillColor} x="0" y="0" width="90" height="120" />
    </svg>
  )
}
export default Card
