import Icon from '../Icon'
import React from 'react'

type Props = {
  color: string
}

export default ({ color }: Props) => (
  <Icon className="logo-dropbox-2" width={32} height={32}>
    <title>logo dropbox 2</title>
    <g fill={color}>
      <polygon
        fill={color}
        points="9.41319,1.11824 0,7.26432 6.50879,12.47649 15.99985,6.61586 "
      />
      <polygon
        fill={color}
        points="0,17.68899 9.41319,23.83504 15.99985,18.33712 6.50879,12.47649 "
      />
      <polygon
        fill={color}
        points="15.99985,18.33712 22.58681,23.83504 32,17.68899 25.49121,12.47649 "
      />
      <polygon
        fill={color}
        points="32,7.26432 22.58681,1.11824 15.99985,6.61586 25.49121,12.47649 "
      />
      <polygon points="16.01932,19.51992 9.41319,25.00165 6.58635,23.15606 6.58635,25.22512 16.01932,30.88176 25.45226,25.22512 25.45226,23.15606 22.62543,25.00165 " />
    </g>
  </Icon>
)
