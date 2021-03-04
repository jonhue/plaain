import './Backdrop.scss'
import React from 'react'

type BackdropProps = {
  url: string
}

export const Backdrop = ({ url }: BackdropProps) => (
  <picture className="Backdrop">
    <img src={url} alt="backdrop" />
  </picture>
)
