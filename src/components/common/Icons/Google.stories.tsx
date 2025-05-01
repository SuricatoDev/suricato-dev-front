import type { Meta, StoryObj } from '@storybook/react'

import { Google } from '.'

const meta: Meta<typeof Google> = {
  title: 'Icons/Google',
  component: Google,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof Google>

export const Default: Story = {
  args: {
    size: 50
  }
}
