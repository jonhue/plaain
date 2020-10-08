import './ProviderButton.scss'
import React from 'react'

type ProviderButtonProps = {
  className?: string
  icon: JSX.Element

  onClick: (event: React.MouseEvent) => void
}

const ProviderButton = ({ className, icon, onClick }: ProviderButtonProps) => (
  <div className="ProviderButton">
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  </div>
)

export default ProviderButton
