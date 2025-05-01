import type { Meta, StoryObj } from '@storybook/react'

import { Valid } from '.'

const meta: Meta<typeof Valid> = {
  title: 'Icons/Valid',
  component: Valid,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof Valid>

export const Default: Story = {
  args: {
    size: 50
  }
}
