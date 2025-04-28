import React, { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import PasswordConfirmation from '.'

const meta: Meta<typeof PasswordConfirmation> = {
  title: 'Components/PasswordConfirmation',
  component: PasswordConfirmation,
  tags: ['autodocs'],
  argTypes: {
    userName: { control: 'text' },
    userEmail: { control: 'text' }
  }
}
export default meta

type Story = StoryObj<typeof PasswordConfirmation>

const Template = (args: { userName: string; userEmail: string }) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <PasswordConfirmation
      {...args}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      onNewPasswordChange={(e) => setNewPassword(e.target.value)}
      onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
    />
  )
}

export const Default: Story = {
  render: Template,
  args: {
    userName: 'Teste Exemplo',
    userEmail: 'teste@example.com'
  },
  parameters: {
    docs: {
      source: { state: 'open' }
    }
  }
}
