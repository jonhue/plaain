import './Back.scss'
import React, { FunctionComponent, useCallback } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

type BackProps = {
  children?: React.ReactNode
}

export const Back: FunctionComponent<BackProps> = ({ children }) => {
  const navigate = useNavigate()

  const isDisabled = history.length <= 2

  const handleClick = useCallback(() => navigate(-1), [navigate])

  return (
    <div
      className={classNames('Back', { disabled: isDisabled })}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
