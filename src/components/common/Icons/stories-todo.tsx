import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import * as Icons from '.'

const meta: Meta = {
  title: 'Components/Icons',
  argTypes: {},
  tags: ['autodocs']
}
export default meta

export const Default: StoryObj = {
  render: () => {
    const entries = Object.entries(Icons) as [
      string,
      React.ComponentType<unknown>
    ][]
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '1rem',
          alignItems: 'flex-end',
          textAlign: 'center'
        }}
      >
        {entries.map(([name, Icon]) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Icon />
            <div style={{ marginTop: 4, fontSize: 12 }}>{name}</div>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        type: 'skip'
      }
    }
  }
}
