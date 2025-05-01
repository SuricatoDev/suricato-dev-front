import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import Button from '.'
import { Google } from '../Icons'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs']
} as Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Continuar'
  }
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button'
  }
}

export const Contained: Story = {
  args: {
    variant: 'contained',
    children: 'Contained Button'
  }
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button'
  }
}

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button'
  }
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width'
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading…'
  }
}

export const Rounded: Story = {
  args: {
    rounded: true,
    children: 'Rounded Button'
  }
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button'
  }
}

export const WithIcon: Story = {
  args: {
    children: 'Continuar com Google',
    variant: 'outlined'
  },
  render: (args) => <Button {...args} icon={<Google />} />
}
