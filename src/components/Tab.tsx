import './Tab.scss'
import { Link, useMatch } from 'react-router-dom'
import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

type TabProps = {
  to: string
  end?: boolean
  disabled?: boolean
}

export const Tab: FunctionComponent<TabProps> = ({
  children,
  to,
  end,
  disabled,
}) => {
  const isActive = !!useMatch({ path: to, end })

  return (
    <Link className={classNames('Tab', { active: isActive, disabled })} to={to}>
      {children}
    </Link>
  )
}
