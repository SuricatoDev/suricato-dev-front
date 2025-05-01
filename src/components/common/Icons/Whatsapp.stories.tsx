import type { Meta, StoryObj } from '@storybook/react'

import { Whatsapp } from '.'

const meta: Meta<typeof Whatsapp> = {
  title: 'Icons/Whatsapp',
  component: Whatsapp,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof Whatsapp>

export const Default: Story = {
  args: {
    size: 50
  }
}
