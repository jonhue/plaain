import Icon from '../Icon'
import React from 'react'

type Props = {
  color: string
}

export default ({ color }: Props) => (
  <Icon className="google-2" width={32} height={32}>
    <title>google 2</title>
    <g fill={color}>
      <path
        d="M30.383,13.273H16.065v6.136H24.18c-1.3,4.091-4.5,5.455-8.18,5.455a8.864,8.864,0,1,1,5.691-15.65L26.15,4.967A15,15,0,1,0,16,31C24.271,31,31.747,25.545,30.383,13.273Z"
        fill={color}
      />
    </g>
  </Icon>
)
