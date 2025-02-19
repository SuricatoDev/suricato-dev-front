import { Meta, StoryObj } from '@storybook/react'
import Shadow, { ShadowProps } from './'

export default {
  title: 'Components/Shadow',
  component: Shadow,
  argTypes: {
    color: {
      control: 'color',
      description: 'Cor da sombra',
      defaultValue: '#000000'
    },
    opacity: {
      control: 'text',
      description: 'Opacidade da sombra',
      defaultValue: '0.75'
    },
    className: {
      control: 'text',
      description: 'Classe CSS adicional'
    },
    onClick: {
      action: 'clicked',
      description: 'Função chamada ao clicar na sombra'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '5rem' }}>
        <Story />
      </div>
    )
  ]
} as Meta<ShadowProps>

export const Default: StoryObj<ShadowProps> = {
  args: {
    color: '#000000',
    opacity: '0.75'
  }
}
