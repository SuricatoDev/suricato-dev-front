import { Meta, StoryObj } from '@storybook/react'
import Accordion from '.'

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    ask: {
      control: 'text',
      description: 'Pergunta'
    },
    answer: {
      control: 'text',
      description: 'Resposta'
    },
    is_open: {
      control: 'boolean',
      description: 'Estado inicial do accordion'
    },
    on_toggle: {
      description: `Função para funcionalidade específica **(opcional)**.
        \nEx: permitir que apenas 1 accordion seja aberto por vez`
    }
  }
} as Meta

export const Default: StoryObj = {
  args: {
    ask: 'Lorem ipsum dolor sit amet?',
    answer:
      'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    is_open: false
  }
}

export const AbertoInicialmente: StoryObj = {
  args: {
    ...Default.args,
    is_open: true
  }
}
