import './ErrorViewer.scss'
import React, { useEffect, useState } from 'react'

type ErrorViewerProps = {
  error?: Error

  onClose: () => void
}

export const ErrorViewer = ({ error, onClose }: ErrorViewerProps) => {
  const [show, setShow] = useState(false)

  const hide = () => {
    onClose()
    setShow(false)
  }

  useEffect(() => {
    setShow(error !== undefined)
  }, [error])

  return <div className="ErrorViewer">{error && <h3>{error}</h3>}</div>
}

export default ErrorViewer
