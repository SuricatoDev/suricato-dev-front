import type { Meta, StoryObj } from '@storybook/react'

import GoogleIcon from './GoogleIcon'

const meta: Meta<typeof GoogleIcon> = {
  title: 'Icons/GoogleIcon',
  component: GoogleIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof GoogleIcon>

export const Default: Story = {
  args: {
    size: 50
  }
}
