import { Icon } from '../Icon'
import React from 'react'

type SettingsIconProps = {
  color: string
}

export const SettingsIcon = ({ color }: SettingsIconProps) => (
  <Icon className="settings-gear" width={24} height={24}>
    <title>settings gear</title>
    <g fill={color} stroke={color}>
      <circle cx="12" cy="12" fill="none" r="3" />
      <path
        d="M20,12a8.049,8.049,0,0,0-.188-1.713l2.714-2.055-2-3.464L17.383,6.094a7.987,7.987,0,0,0-2.961-1.719L14,1H10L9.578,4.375A7.987,7.987,0,0,0,6.617,6.094L3.474,4.768l-2,3.464,2.714,2.055a7.9,7.9,0,0,0,0,3.426L1.474,15.768l2,3.464,3.143-1.326a7.987,7.987,0,0,0,2.961,1.719L10,23h4l.422-3.375a7.987,7.987,0,0,0,2.961-1.719l3.143,1.326,2-3.464-2.714-2.055A8.049,8.049,0,0,0,20,12Z"
        fill="none"
        stroke={color}
      />
    </g>
  </Icon>
)
