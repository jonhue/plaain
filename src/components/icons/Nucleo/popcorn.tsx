import Icon from '../Icon'
import React from 'react'

type Props = {
  color: string
}

export default ({ color }: Props) => (
  <Icon className="popcorn" width={24} height={24}>
    <title>popcorn</title>
    <g fill={color}>
      <polygon fill="none" points="21 7 3 7 5 23 19 23 21 7" stroke={color} />
      <path
        d="M19,5a3,3,0,0,0-3-3,2.97,2.97,0,0,0-1.47.4,2.986,2.986,0,0,0-5.06,0A2.97,2.97,0,0,0,8,2,3,3,0,0,0,5,5"
        fill="none"
        stroke={color}
      />
      <line fill="none" stroke={color} x1="9" x2="8" y1="23" y2="7" />
      <line fill="none" stroke={color} x1="15" x2="16" y1="23" y2="7" />
    </g>
  </Icon>
)
