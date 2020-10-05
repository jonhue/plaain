import './Toast.scss'
import React from 'react'

type ToastProps = {
  title: string
  text: string
  action?: {
    text: string
    url: string
  }
}

const Toast = ({ title, text, action }: ToastProps) => (
  <div className="Toast">
    <h2>{title}</h2>
    <p>{text}</p>
    {action && (
      <a href={action.url} target="_blank" rel="noopener noreferrer">
        {action.text}
      </a>
    )}
  </div>
)

export default Toast
