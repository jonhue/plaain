import { Icon } from './Icon'
import React from 'react'

type SoundWaveIconProps = {
  color: string
}

export const SoundWaveIcon = ({ color }: SoundWaveIconProps) => (
  <Icon className="SoundWave" height={50} width={50}>
    <path
      fill="none"
      d="M2.5 26.5h4l4-6 8 20 10-32 8 26 6-8h4"
      stroke={color}
      className="unPUVPIZ_0"
    ></path>
    <style data-made-with="vivus-instant">{`.unPUVPIZ_0{stroke-dasharray:108 110;stroke-dashoffset:109;animation:unPUVPIZ_draw_0 750ms ease-in-out 0ms infinite,unPUVPIZ_fade 750ms linear 0ms infinite;}@keyframes unPUVPIZ_draw{100%{stroke-dashoffset:0;}}@keyframes unPUVPIZ_fade{0%{stroke-opacity:1;}100%{stroke-opacity:1;}100%{stroke-opacity:0;}}@keyframes unPUVPIZ_draw_0{0%{stroke-dashoffset: 109}66.66666666666666%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}`}</style>
  </Icon>
)
