import './Tab.scss'
import { Link, useMatch } from 'react-router-dom'
import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

type TabProps = {
  to: string
  inexact?: boolean
  disabled?: boolean
  forceActive?: boolean
  children?: React.ReactNode
}

export const Tab: FunctionComponent<TabProps> = ({
  children,
  to,
  inexact,
  disabled,
  forceActive,
}) => {
  const isActive = !!useMatch(`${to}${inexact ? '/*' : ''}`)

  return (
    <Link
      className={classNames('Tab', {
        active: isActive || forceActive,
        disabled,
      })}
      to={to}
    >
      {children}
    </Link>
  )
}
