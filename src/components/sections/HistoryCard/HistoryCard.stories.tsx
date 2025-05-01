import React, { useState } from 'react'

import { Reserva } from '@/pages/reservas'
import { Meta, StoryObj } from '@storybook/react'

import HistoryCard, { HistoryCardProps } from '.'

const mockCaravan: Reserva = {
  id: '1',
  reserva_id: 1,
  titulo: 'Viagem à Serra',
  descricao: 'Passeio de fim de semana',
  categoria: 'Turismo',
  data_partida: '2025-06-15T08:00:00Z',
  data_retorno: '2025-06-17T18:00:00Z',
  endereco_origem: 'Rua A',
  numero_origem: '123',
  complemento_origem: 'Apt 4',
  bairro_origem: 'Centro',
  cidade_origem: 'Porto Alegre',
  estado_origem: 'RS',
  cep_origem: '90000-000',
  endereco_destino: 'Avenida B',
  numero_destino: '456',
  complemento_destino: '',
  bairro_destino: 'Serra',
  cidade_destino: 'Gramado',
  estado_destino: 'RS',
  cep_destino: '95670-000',
  numero_vagas: 10,
  vagas_disponiveis: 5,
  valor: 350,
  organizador_id: 99,
  imagens: [],
  status: 'Confirmado',
  nota: null,
  organizador: {
    id: 99,
    nome_fantasia: 'Serra Tours',
    razao_social: 'Serra Turismo LTDA'
  }
}

const meta: Meta<HistoryCardProps> = {
  title: 'Sections/HistoryCard',
  component: HistoryCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 20, maxWidth: 1440, margin: 'auto' }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    open: { control: 'boolean' },
    enableActionsButtons: { control: 'boolean' },
    isCancelling: { control: 'boolean' },
    isRating: { control: 'boolean' },
    onCancel: { action: 'onCancel' },
    onRate: { action: 'onRate' }
  }
}

export default meta

type Story = StoryObj<HistoryCardProps>

export const Default: Story = {
  args: {
    caravan: mockCaravan,
    enableActionsButtons: true,
    onCancel: async (id) => alert(`Cancelando reserva ${id}`),
    open: false
  }
}

export const Expanded: Story = {
  ...Default,
  name: 'Cartão Expandido',
  args: {
    ...Default.args,
    open: true
  }
}

export const Cancelling: Story = {
  name: 'Simular loading de cancelamento',
  render: function CancellingStory(args) {
    const [isCancelling, setIsCancelling] = useState(false)

    const handleCancel = async () => {
      setIsCancelling(true)
      await new Promise((r) => setTimeout(r, 2000))
      setIsCancelling(false)
    }

    return (
      <HistoryCard
        {...args}
        open={true}
        isCancelling={isCancelling}
        onCancel={handleCancel}
      />
    )
  },
  args: {
    caravan: mockCaravan,
    enableActionsButtons: true
  }
}

export const RatingMode: Story = {
  args: {
    caravan: { ...mockCaravan, nota: null },
    enableActionsButtons: false,
    onRate: async (rating) => alert(`Avaliado com nota ${rating}`),
    open: true
  }
}

export const RatingInProgress: Story = {
  ...RatingMode,
  name: 'Avaliando (loading)',
  args: {
    ...RatingMode.args,
    isRating: true
  }
}
