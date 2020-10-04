import './Icon.scss'
import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

type IconProps = {
  className: string
  height?: number
  width?: number
}

export const Icon: FunctionComponent<IconProps> = ({
  children,
  className,
  height,
  width,
}) => (
  <svg
    className={classNames('Icon', className)}
    viewBox={height && width ? `0 0 ${width} ${height}` : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
)

export default Icon
