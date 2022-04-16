import './Icon.scss'
import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

type IconProps = {
  className: string
  height: number
  width: number
  x?: number
  y?: number
  children?: React.ReactNode
}

export const Icon: FunctionComponent<IconProps> = ({
  children,
  className,
  height,
  width,
  x,
  y,
}) => (
  <svg
    className={classNames('Icon', className)}
    viewBox={`${x || 0} ${y || 0} ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
)
