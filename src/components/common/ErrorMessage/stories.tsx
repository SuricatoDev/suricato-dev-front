import { Meta, StoryObj } from '@storybook/react'

import ErrorMessage from '.'

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    $error: { control: 'text' },
    withIcon: { control: 'boolean' }
  }
}
export default meta

type Story = StoryObj<typeof ErrorMessage>

export const Default: Story = {
  args: {
    $error: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
    withIcon: true
  },
  parameters: {
    docs: {
      source: { state: 'open' }
    }
  }
}
