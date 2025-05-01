import { Meta, StoryObj } from '@storybook/react'

import { Plus } from '@phosphor-icons/react/dist/ssr/Plus'
import { SmileySad } from '@phosphor-icons/react/dist/ssr/SmileySad'

import FloatingButton, { FloatingButtonProps } from '.'

export default {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '300px'
        }}
      >
        <Story />
      </div>
    )
  ],
  argTypes: {
    icon: { control: false }
  }
} as Meta<FloatingButtonProps>

type Story = StoryObj<FloatingButtonProps>

export const Default: Story = {
  args: {
    onClick: () => alert('Clicou!'),
    icon: <Plus size={28} weight="bold" />,
    size: 60,
    right: 16,
    bottom: 16,
    backgroundColor: '#F68C4B',
    iconColor: '#FFFFFF',
    animate: true
  }
}

export const Secondary: Story = {
  args: {
    ...Default.args,
    icon: <SmileySad size={28} weight="bold" />,
    backgroundColor: '#1289D0'
  }
}

export const Large: Story = {
  args: {
    ...Default.args,
    size: 80,
    icon: <Plus size={32} weight="bold" />,
    right: 24,
    bottom: 24
  }
}

export const NoPulse: Story = {
  args: {
    ...Default.args,
    animate: false
  }
}

export const TopLeft: Story = {
  args: {
    ...Default.args,
    top: 16,
    left: 16,
    bottom: undefined,
    right: undefined
  }
}
