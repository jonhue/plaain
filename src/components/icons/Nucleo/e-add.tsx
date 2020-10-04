import Icon from '../Icon'
import React from 'react'

type Props = {
  color: string
}

export default ({ color }: Props) => (
  <Icon className="e-add" width={32} height={32}>
    <title>e add</title>
    <g fill={color} stroke={color}>
      <line fill="none" stroke={color} x1="16" x2="16" y1="2" y2="30" />
      <line fill="none" stroke={color} x1="30" x2="2" y1="16" y2="16" />
    </g>
  </Icon>
)
