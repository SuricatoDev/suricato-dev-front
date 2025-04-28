import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import FloatingButton from '.'

const meta: Meta<typeof FloatingButton> = {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '400px'
        }}
      >
        <Story />
      </div>
    )
  ]
}
export default meta

type Story = StoryObj<typeof FloatingButton>

export const Default: Story = {
  parameters: {
    docs: {
      source: { state: 'open' }
    }
  }
}
