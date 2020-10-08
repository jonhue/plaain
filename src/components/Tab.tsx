import './Tab.scss'
import React, { FunctionComponent } from 'react'
import { matchPath, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

type TabProps = {
  to: string
  exact?: boolean
  disabled?: boolean
}

const Tab: FunctionComponent<TabProps> = ({
  children,
  to,
  exact,
  disabled,
}) => {
  const location = useLocation()
  const isActive = !!matchPath(location.pathname, { path: to, exact })

  return (
    <Link className={classNames('Tab', { active: isActive, disabled })} to={to}>
      {children}
    </Link>
  )
}

export default Tab
