import Icon from '../Icon'
import React from 'react'

type Props = {
  color: string
}

export default ({ color }: Props) => (
  <Icon className="e-remove" width={24} height={24}>
    <title>e remove</title>
    <g fill={color} stroke={color}>
      <line fill="none" stroke={color} x1="19" y1="5" x2="5" y2="19" />
      <line fill="none" stroke={color} x1="19" y1="19" x2="5" y2="5" />
    </g>
  </Icon>
)
