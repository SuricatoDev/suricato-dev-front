import React from 'react'

import { Meta } from '@storybook/react'

import * as Icons from './index'

const meta: Meta = {
  title: 'Icons/AllIcons'
}
export default meta

export const AllIcons = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 80px)',
      gap: 16,
      alignItems: 'end'
    }}
  >
    {Object.entries(Icons).map(([name, Icon]) => {
      const IconComponent = Icon as React.FC<React.SVGProps<SVGSVGElement>>
      return (
        <div
          key={name}
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <IconComponent width={32} height={32} />
          <div style={{ fontSize: 12, marginTop: 4 }}>{name}</div>
        </div>
      )
    })}
  </div>
)
