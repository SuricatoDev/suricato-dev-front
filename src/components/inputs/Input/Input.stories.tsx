import { Meta, StoryObj } from '@storybook/react'

import Input, { InputProps } from '.'

const meta: Meta<InputProps> = {
  title: 'Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', description: 'Texto de placeholder' },
    label: { control: 'text', description: 'Rótulo flutuante' },
    disabled: { control: 'boolean', description: 'Desabilita o campo' },
    loading: { control: 'boolean', description: 'Mostra spinner de loading' },
    error: { control: 'text', description: 'Mensagem de erro' },
    showErrorMessage: {
      control: 'boolean',
      description: 'Exibe a mensagem de erro abaixo'
    },
    largePaddingRight: {
      control: 'boolean',
      description: 'Aumenta padding à direita'
    },
    value: { control: 'text', description: 'Valor pré-preenchido' }
  }
}
export default meta

type Story = StoryObj<InputProps>

export const Default: Story = {
  args: {
    placeholder: 'Digite aqui…'
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Seu nome',
    placeholder: ' '
  }
}

export const Prefilled: Story = {
  args: {
    label: 'E-mail',
    value: 'usuario@exemplo.com'
  }
}

export const Error: Story = {
  args: {
    placeholder: 'Digite algo…',
    error: 'Campo obrigatório',
    showErrorMessage: true
  }
}

export const Loading: Story = {
  args: {
    placeholder: 'Carregando…',
    loading: true
  }
}

export const Disabled: Story = {
  args: {
    placeholder: 'Não editável',
    disabled: true
  }
}
