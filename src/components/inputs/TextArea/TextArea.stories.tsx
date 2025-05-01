import React, { ChangeEvent, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import Textarea, { TextareaProps } from '.'

const meta: Meta<TextareaProps> = {
  title: 'Inputs/TextArea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Texto do rótulo flutuante' },
    placeholder: { control: 'text', description: 'Placeholder quando vazio' },
    defaultValue: {
      control: 'text',
      description: 'Valor inicial (uncontrolled)'
    },
    error: { control: 'text', description: 'Mensagem de erro' },
    showErrorMessage: {
      control: 'boolean',
      description: 'Exibir ou não a mensagem de erro'
    },
    disabled: { control: 'boolean', description: 'Desabilita o campo' },
    rows: {
      control: { type: 'number', min: 1 },
      description: 'Número de linhas visíveis'
    }
  }
}
export default meta

type Story = StoryObj<TextareaProps>

export const Default: Story = {
  args: {
    defaultValue: '',
    placeholder: 'Digite seu texto aqui...',
    rows: 3
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Descrição',
    defaultValue: '',
    placeholder: 'Conte-nos o que aconteceu...',
    rows: 4
  }
}

export const WithError: Story = {
  args: {
    label: 'Comentário',
    defaultValue: '',
    error: 'Comentário obrigatório',
    showErrorMessage: true,
    rows: 3
  }
}

export const Disabled: Story = {
  args: {
    label: 'Notas (somente leitura)',
    disabled: true,
    rows: 3
  }
}

export const LongContent: Story = {
  render: () => {
    const LongContentComponent = () => {
      const [value, setValue] = useState(
        Array.from({ length: 20 })
          .map(
            (_, i) =>
              `Linha ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
          )
          .join('\n')
      )
      const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value)

      return (
        <div style={{ maxWidth: 400 }}>
          <Textarea
            label="Relato completo"
            value={value}
            onChange={handleChange}
            rows={8}
          />
        </div>
      )
    }

    return <LongContentComponent />
  },
  name: 'Conteúdo longo (scroll interno)'
}
