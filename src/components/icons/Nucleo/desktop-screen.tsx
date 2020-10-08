import Icon from '../Icon'
import React from 'react'

type Props = {
  color: string
}

export default ({ color }: Props) => (
  <Icon className="desktop-screen" width={24} height={24}>
    <title>desktop screen</title>
    <g fill={color}>
      <line fill="none" stroke={color} x1="12" x2="12" y1="22" y2="18" />
      <line fill="none" stroke={color} x1="6" x2="18" y1="22" y2="22" />
      <rect height="16" width="22" fill="none" stroke={color} x="1" y="2" />
    </g>
  </Icon>
)
