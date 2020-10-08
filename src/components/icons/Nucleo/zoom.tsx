import Icon from '../Icon'
import React from 'react'

type Props = {
  color: string
}

export default ({ color }: Props) => (
  <Icon className="zoom" width={24} height={24}>
    <title>zoom</title>
    <g fill={color}>
      <line
        fill="none"
        stroke={color}
        x1="22"
        x2="15.656"
        y1="22"
        y2="15.656"
      />
      <circle cx="10" cy="10" fill="none" r="8" stroke={color} />
    </g>
  </Icon>
)
