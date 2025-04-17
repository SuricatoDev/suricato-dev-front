import { Meta, StoryObj } from '@storybook/react'

import Button from '.'
import { GoogleIcon } from '../Icons'

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Continuar'
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['ghost', 'outlined', 'contained']
      }
    }
  }
} as Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Continuar'
  }
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Continuar'
  }
}

export const Contained: Story = {
  args: {
    variant: 'contained',
    children: 'Continuar'
  }
}

export const WithIcon: Story = {
  args: {
    icon: <GoogleIcon />,
    children: 'Continuar com Google',
    variant: 'outlined'
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Continuar'
  }
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Continuar'
  }
}
