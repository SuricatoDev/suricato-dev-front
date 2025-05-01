import * as React from 'react'

import { IconProps } from '@/interfaces/icon'

const SVGComponent: React.FC<IconProps> = ({ size = 10, style, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-label="A regra n\xE3o foi aprovada"
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
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3 4L8 7 5 4 4 5l3 3-3 3 1 1 3-3 3 3 1-1-3-3 3-3-1-1z" />
    </svg>
  )
}
export default SVGComponent
