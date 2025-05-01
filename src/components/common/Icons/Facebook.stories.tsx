import type { Meta, StoryObj } from '@storybook/react'

import { Facebook } from '.'

const meta: Meta<typeof Facebook> = {
  title: 'Icons/Facebook',
  component: Facebook,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof Facebook>

export const Default: Story = {
  args: {
    size: 50
  }
}
