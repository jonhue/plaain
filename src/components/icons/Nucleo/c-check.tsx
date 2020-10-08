import Icon from '../Icon'
import React from 'react'

type Props = {
  color: string
}

export default ({ color }: Props) => (
  <Icon className="c-check" width={24} height={24}>
    <title>c check</title>
    <g fill={color}>
      <path
        d="M12,0A12,12,0,1,0,24,12,12.035,12.035,0,0,0,12,0ZM10,17.414,4.586,12,6,10.586l4,4,8-8L19.414,8Z"
        fill={color}
      />
    </g>
  </Icon>
)
