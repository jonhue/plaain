import './Cover.scss'
import React from 'react'

type CoverProps = {
  url: string
  alt: string
}

export const Cover = ({ url, alt }: CoverProps) => (
  <img className="Cover" src={url} alt={alt} />
)
