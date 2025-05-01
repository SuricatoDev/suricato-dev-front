import { Meta, StoryObj } from '@storybook/react'

import InputEmail, { InputEmailProps } from '.'

const meta: Meta<InputEmailProps> = {
  title: 'Inputs/InputEmail',
  component: InputEmail,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
    onKeyDown: { action: 'onKeyDown' }
  }
}
export default meta

type Story = StoryObj<InputEmailProps>

export const Default: Story = {
  args: {
    value: '',
    showDropdown: false,
    label: 'Email'
  }
}

export const Prefilled: Story = {
  name: 'Pré-preenchido (container alto)',
  args: {
    value: 'usuario@',
    showDropdown: true,
    label: 'Email'
  },
  render: (args) => (
    <div style={{ height: '240px', width: '100%' }}>
      <InputEmail width={'100%'} {...args} />
    </div>
  )
}
export const ErrorState: Story = {
  args: {
    value: '',
    error: 'Email inválido',
    label: 'Email',
    showDropdown: true,
    onBlur: () => {}
  }
}

export const Disabled: Story = {
  args: {
    value: '',
    disabled: true,
    label: 'Email'
  }
}
