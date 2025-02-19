import { Meta, StoryObj } from '@storybook/react'
import Notification, { NotificationProps } from '.'

export default {
  title: 'Components/Notification',
  component: Notification,
  argTypes: {
    duration: {
      description: 'Tempo de duração da notificação (em milisegundos)'
    },
    message: {
      description: 'Mensagem da notificação'
    },
    onClose: {
      description: 'Função ao fechar a notificação **(opcional)**'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ height: '50px', width: '100%' }}>
        <Story />
      </div>
    )
  ]
} as Meta<NotificationProps>

export const Default: StoryObj<NotificationProps> = {
  args: {
    duration: 50000,
    message: 'Texto copiado'
  }
}
