import { Meta, StoryObj } from '@storybook/react'

import InputBirthDate, { InputBirthDateProps } from '.'

const meta: Meta<typeof InputBirthDate> = {
  title: 'Inputs/InputBirthDate',
  component: InputBirthDate,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' }
  }
}
export default meta

type Story = StoryObj<InputBirthDateProps>

export const Default: Story = {
  args: {
    defaultDay: '',
    defaultMonth: '',
    defaultYear: '',
    minAge: 0
  }
}

export const Filled: Story = {
  name: 'Tudo preenchido',
  args: {
    defaultDay: '27',
    defaultMonth: '06',
    defaultYear: '2000',
    minAge: 18
  }
}
