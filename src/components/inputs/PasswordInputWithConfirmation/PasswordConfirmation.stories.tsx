import React, { ChangeEvent, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import PasswordInputWithConfirmation, {
  PasswordInputWithConfirmationProps
} from '.'

type Args = {
  userName: PasswordInputWithConfirmationProps['userName']
  userEmail: PasswordInputWithConfirmationProps['userEmail']
  initialNew: string
  initialConfirm: string
}

const meta: Meta<Args> = {
  title: 'Inputs/PasswordInputWithConfirmation',
  component: PasswordInputWithConfirmation,
  tags: ['autodocs'],
  argTypes: {
    userName: {
      control: 'text',
      description: 'Nome do usuário, usado na validação de força'
    },
    userEmail: {
      control: 'text',
      description: 'E-mail do usuário, usado na validação de força'
    },
    initialNew: {
      control: 'text',
      name: 'Senha inicial',
      description: 'Valor inicial do campo “Nova senha”'
    },
    initialConfirm: {
      control: 'text',
      name: 'Confirmação inicial',
      description: 'Valor inicial do campo “Confirme a nova senha”'
    }
  }
}
export default meta

type Story = StoryObj<Args>

const Template: React.FC<Args> = ({
  userName,
  userEmail,
  initialNew,
  initialConfirm
}) => {
  const [newPassword, setNewPassword] = useState(initialNew)
  const [confirmPassword, setConfirmPassword] = useState(initialConfirm)

  const handleNew = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value)
  const handleConfirm = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value)

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <PasswordInputWithConfirmation
        userName={userName}
        userEmail={userEmail}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onNewPasswordChange={handleNew}
        onConfirmPasswordChange={handleConfirm}
      />
    </div>
  )
}

export const Empty: Story = {
  name: 'Campos vazios',
  render: (args) => <Template {...args} />,
  args: {
    userName: 'João Silva',
    userEmail: 'joao@example.com',
    initialNew: '',
    initialConfirm: ''
  }
}

export const WeakPassword: Story = {
  name: 'Senha fraca',
  render: (args) => <Template {...args} />,
  args: {
    userName: 'João Silva',
    userEmail: 'joao@example.com',
    initialNew: 'abc123',
    initialConfirm: 'abc123'
  }
}

export const StrongPassword: Story = {
  name: 'Senha forte e igual',
  render: (args) => <Template {...args} />,
  args: {
    userName: 'João Silva',
    userEmail: 'joao@example.com',
    initialNew: 'Str0ng!Pass',
    initialConfirm: 'Str0ng!Pass'
  }
}

export const MismatchPasswords: Story = {
  name: 'Senhas não coincidem',
  render: (args) => <Template {...args} />,
  args: {
    userName: 'João Silva',
    userEmail: 'joao@example.com',
    initialNew: 'Str0ng!Pass',
    initialConfirm: 'OtherPass123'
  }
}
