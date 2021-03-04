import './Back.scss'
import React, { FunctionComponent, useCallback } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router'

export const Back: FunctionComponent = ({ children }) => {
  const history = useHistory()

  const isDisabled = history.length <= 2

  const handleClick = useCallback(() => history.goBack(), [history])

  return (
    <div
      className={classNames('Back', { disabled: isDisabled })}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
