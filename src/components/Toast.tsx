import './Toast.scss'
import { CloseIcon } from './icons/Nucleo/CloseIcon'
import React from 'react'

type ToastProps = {
  title: string
  text: string
  action?: {
    text: string
    url: string
  }

  onClose: () => void
}

export const Toast = ({ title, text, action, onClose }: ToastProps) => (
  <div className="Toast">
    <div className="Toast__header">
      <h2>{title}</h2>
      <div className="Toast__header__close" onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
    <p>{text}</p>
    {action && (
      <a href={action.url} target="_blank" rel="noopener noreferrer">
        {action.text}
      </a>
    )}
  </div>
)
