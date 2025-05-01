import React, { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import InputPassword from '.'

const meta: Meta<typeof InputPassword> = {
  title: 'Components/PasswordInput',
  component: InputPassword,
  tags: ['autodocs']
}
export default meta
type Story = StoryObj<typeof InputPassword>

export const Default: Story = {
  args: {
    $showStrengthMeter: true,
    userName: 'Teste Exemplo',
    userEmail: 'teste@example.com'
  },
  render: (args) => <DefaultWrapper {...args} />
}

const DefaultWrapper: React.FC<(typeof Default)['args']> = (args) => {
  const [value, setValue] = useState('')
  return (
    <InputPassword
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
