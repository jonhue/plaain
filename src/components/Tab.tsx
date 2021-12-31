import './Tab.scss'
import { Link, useMatch } from 'react-router-dom'
import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

type TabProps = {
  to: string
  inexact?: boolean
  disabled?: boolean
  activePaths?: string[]
}

export const Tab: FunctionComponent<TabProps> = ({
  children,
  to,
  inexact,
  disabled,
  activePaths,
}) => {
  const isActive = [to, ...(activePaths || [])].some(
    (path) => !!useMatch({ path: `${path}${inexact ? '/*' : ''}` }),
  )

  return (
    <Link className={classNames('Tab', { active: isActive, disabled })} to={to}>
      {children}
    </Link>
  )
}
