import { Meta, StoryObj } from '@storybook/react'
import Tj, { TjProps } from './'

export default {
  title: 'Components/Tj',
  component: Tj,
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteúdo a ser exibido dentro do componente'
    },
    contrast: {
      control: 'boolean',
      description: 'Define se o componente deve usar um estilo de contraste',
      defaultValue: false
    },
    align: {
      control: 'select',
      options: ['center', 'left', 'right'],
      description: 'Alinhamento do texto dentro do componente',
      defaultValue: 'center'
    },
    size: {
      control: 'select',
      options: ['auto', 'md', 'lg'],
      description: 'Tamanho do componente',
      defaultValue: 'md'
    }
  }
} as Meta<TjProps>

export const Default: StoryObj<TjProps> = {
  args: {
    children: 'Texto padrão para o componente Tj',
    contrast: false,
    align: 'center',
    size: 'md'
  }
}

export const WithContrast: StoryObj<TjProps> = {
  args: {
    children: 'Texto com contraste',
    contrast: true,
    align: 'center',
    size: 'md'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
