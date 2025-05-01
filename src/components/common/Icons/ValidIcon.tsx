import * as React from 'react'

import { IconProps } from '@/interfaces/icon'

const SVGComponent: React.FC<IconProps> = ({ size = 10, style, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-label="Regra aprovada"
      role="img"
      focusable="false"
      width={size}
      height={size}
      style={{
        display: 'block',
        ...style
      }}
      {...props}
    >
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.16 4.87L6.67 9.36 4.42 7.1 3.29 8.23l3.38 3.38L12.29 6z" />
    </svg>
  )
}
export default SVGComponent
