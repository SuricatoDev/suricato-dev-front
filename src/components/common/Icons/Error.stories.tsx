import type { Meta, StoryObj } from '@storybook/react'

import { Error } from './'

const meta: Meta<typeof Error> = {
  title: 'Icons/Error',
  component: Error,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof Error>

export const Default: Story = {
  args: {
    size: 50
  }
}
