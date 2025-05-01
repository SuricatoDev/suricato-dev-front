import type { Meta, StoryObj } from '@storybook/react'

import ErrorIcon from './ErrorIcon'

const meta: Meta<typeof ErrorIcon> = {
  title: 'Icons/ErrorIcon',
  component: ErrorIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof ErrorIcon>

export const Default: Story = {
  args: {
    size: 50
  }
}
