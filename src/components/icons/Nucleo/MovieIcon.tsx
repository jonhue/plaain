import { Icon } from '../Icon'
import React from 'react'

type MovieIconProps = {
  color: string
}

export const MovieIcon = ({ color }: MovieIconProps) => (
  <Icon className="movie-61" width={24} height={24}>
    <title>movie 61</title>
    <g fill={color}>
      <line fill="none" stroke={color} x1="1" x2="1" y1="1" y2="23" />
      <line fill="none" stroke={color} x1="23" x2="23" y1="1" y2="23" />
      <rect height="22" width="14" fill="none" stroke={color} x="5" y="1" />
      <line fill="none" stroke={color} x1="1" x2="23" y1="12" y2="12" />
      <line fill="none" stroke={color} x1="1" x2="5" y1="8" y2="8" />
      <line fill="none" stroke={color} x1="1" x2="5" y1="4" y2="4" />
      <line fill="none" stroke={color} x1="19" x2="23" y1="8" y2="8" />
      <line fill="none" stroke={color} x1="19" x2="23" y1="4" y2="4" />
      <line fill="none" stroke={color} x1="19" x2="23" y1="20" y2="20" />
      <line fill="none" stroke={color} x1="19" x2="23" y1="16" y2="16" />
      <line fill="none" stroke={color} x1="1" x2="5" y1="20" y2="20" />
      <line fill="none" stroke={color} x1="1" x2="5" y1="16" y2="16" />
    </g>
  </Icon>
)
