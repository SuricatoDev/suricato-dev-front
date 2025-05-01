import type { Meta, StoryObj } from '@storybook/react'

import FacebookIcon from './FacebookIcon'

const meta: Meta<typeof FacebookIcon> = {
  title: 'Icons/FacebookIcon',
  component: FacebookIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof FacebookIcon>

export const Default: Story = {
  args: {
    size: 50
  }
}
