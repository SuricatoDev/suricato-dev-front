import type { Meta, StoryObj } from '@storybook/react'

import WhatsappIcon from './WhatsappIcon'

const meta: Meta<typeof WhatsappIcon> = {
  title: 'Icons/WhatsappIcon',
  component: WhatsappIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Tamanho do ícone' }
  }
}
export default meta

type Story = StoryObj<typeof WhatsappIcon>

export const Default: Story = {
  args: {
    size: 50
  }
}
