import Icon from '../Icon'
import React from 'react'

type Props = {
  color: string
}

export default ({ color }: Props) => (
  <Icon className="microsoft" width={32} height={32}>
    <title>microsoft</title>
    <g fill={color}>
      <rect height="14" width="14" fill={color} x="1" y="1" />
      <rect height="14" width="14" x="17" y="1" />
      <rect height="14" width="14" x="1" y="17" />
      <rect height="14" width="14" fill={color} x="17" y="17" />
    </g>
  </Icon>
)
