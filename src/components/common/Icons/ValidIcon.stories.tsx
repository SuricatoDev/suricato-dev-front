import type { Meta, StoryObj } from '@storybook/react'

import ValidIcon from './ValidIcon'

const meta: Meta<typeof ValidIcon> = {
  title: 'Icons/ValidIcon',
  component: ValidIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof ValidIcon>

export const Default: Story = {
  args: {
    size: 50
  }
}
