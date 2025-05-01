import React, { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import InputPassword, { InputPasswordProps } from '.'

const meta: Meta<typeof InputPassword> = {
  title: 'Inputs/PasswordInput',
  component: InputPassword,
  tags: ['autodocs'],
  argTypes: {
    onToggleShow: { action: 'onToggleShow' },
    onChange: { action: 'onChange' }
  }
}
export default meta

type Story = StoryObj<typeof InputPassword>

const Template: React.FC<InputPasswordProps> = (args) => {
  const [value, setValue] = useState(args.value ?? '')
  const [showPwd, setShowPwd] = useState(args.showPassword ?? false)
  return (
    <InputPassword
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        args.onChange?.(e)
      }}
      showPassword={showPwd}
      onToggleShow={() => {
        setShowPwd((s) => !s)
        args.onToggleShow?.()
      }}
    />
  )
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
  name: 'Padrão (vazio)',
  args: {
    showStrengthMeter: true,
    userName: 'John Doe',
    userEmail: 'john@example.com'
  }
}

export const WithInitialValue: Story = {
  render: (args) => <Template {...args} />,
  name: 'Com valor inicial',
  args: {
    ...Default.args,
    value: 'Senha#123'
  }
}

export const NoStrengthMeter: Story = {
  render: (args) => <Template {...args} />,
  name: 'Sem medidor de força',
  args: {
    ...Default.args,
    showStrengthMeter: false
  }
}

export const ErrorState: Story = {
  render: (args) => <Template {...args} />,
  name: 'Estado de erro',
  args: {
    ...Default.args,
    value: '123',
    error: 'Senha muito fraca',
    showErrorMessage: true
  }
}

export const ControlledVisibility: Story = {
  render: (args) => <Template {...args} />,
  name: 'Visibilidade controlada',
  args: {
    ...Default.args,
    value: 'SenhaOculta123',
    showPassword: true
  }
}

export const CustomLabel: Story = {
  render: (args) => <Template {...args} />,
  name: 'Label customizado',
  args: {
    ...Default.args,
    label: 'Crie sua senha segura'
  }
}
