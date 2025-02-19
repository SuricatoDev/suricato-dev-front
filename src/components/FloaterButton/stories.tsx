import { Meta, StoryObj } from '@storybook/react'
import FloaterButton, { FloaterButtonProps } from '.'

export default {
  title: 'Components/FloaterButton',
  component: FloaterButton,
  parameters: {
    docs: {
      description: {
        component: '**Floater button disponível apenas para a versão mobile**'
      }
    }
  },
  argTypes: {
    link_button: {
      description: 'Link do botão'
    },
    text_button: {
      description: 'Texto do botão'
    },
    when_hide_ids: {
      description:
        'Ids que quando estiver em tela, o floater button não deve aparecer'
    },
    on_click: {
      description: 'Função a ser acionada quando clicar no botão **(opcional)**'
    }
  },
  decorators: [
    (Story) => (
      <>
        <style>
          {`
            .floater-button {
              bottom: 0 !important;
              display: block !important;
            }
          `}
        </style>
        <div style={{ height: '50px', width: '100%' }}>
          <Story />
        </div>
      </>
    )
  ]
} as Meta<FloaterButtonProps>

export const Default: StoryObj<FloaterButtonProps> = {
  args: {
    when_hide_ids: ['id-1', 'id-2'],
    link_button: '#',
    text_button: 'Inscreva-se'
  }
}
