import * as React from 'react'

const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-label="A regra n\xE3o foi aprovada"
    role="img"
    focusable="false"
    style={{
      display: 'block',
      height: 10,
      width: 10,
      fill: 'currentcolor'
    }}
    {...props}
  >
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3 4L8 7 5 4 4 5l3 3-3 3 1 1 3-3 3 3 1-1-3-3 3-3-1-1z" />
  </svg>
)
export default SVGComponent
