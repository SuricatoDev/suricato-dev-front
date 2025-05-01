import { Meta, StoryObj } from '@storybook/react'

import MapEmbed from '.'

const meta: Meta<typeof MapEmbed> = {
  title: 'Components/MapEmbed',
  component: MapEmbed,
  tags: ['autodocs'],
  argTypes: {
    location: { control: 'text' }
  }
}
export default meta

type Story = StoryObj<typeof MapEmbed>

export const Default: Story = {
  args: {
    location: 'Fatec Sorocaba'
  },
  parameters: {
    docs: { source: { state: 'open' } }
  }
}
