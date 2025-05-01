import React, { useState } from 'react'

import { Caravan } from '@/interfaces/caravan'
import { Meta, StoryObj } from '@storybook/react'

import ProductCardEdit, { ProductCardEditProps } from '.'

const mockCaravan: Caravan = {
  id: '1',
  titulo: 'Expedição ao Deserto',
  descricao: 'Uma aventura inesquecível para os amantes de natureza.',
  categoria: 'esportivo',
  data_partida: '2025-08-01T08:00:00Z',
  data_retorno: '2025-08-05T18:00:00Z',
  endereco_origem: 'Rua A',
  numero_origem: '100',
  complemento_origem: '',
  bairro_origem: 'Centro',
  cep_origem: '12345-678',
  cidade_origem: 'Sorocaba',
  estado_origem: 'SP',
  endereco_destino: 'Avenida B',
  numero_destino: '200',
  complemento_destino: '',
  bairro_destino: 'Zona Sul',
  cep_destino: '87654-321',
  cidade_destino: 'São Paulo',
  estado_destino: 'SP',
  numero_vagas: 8,
  vagas_disponiveis: 3,
  valor: 499,
  organizador_id: 42,
  imagens: [
    { path: 'https://picsum.photos/id/10/400/300', ordem: 1 },
    { path: 'https://picsum.photos/id/20/400/300', ordem: 2 },
    { path: 'https://picsum.photos/id/30/400/300', ordem: 3 }
  ]
}

const meta: Meta<ProductCardEditProps> = {
  title: 'Sections/ProductCardEdit',
  component: ProductCardEdit,
  decorators: [
    (Story) => (
      <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    activeTab: {
      control: { type: 'radio' },
      options: ['upcoming', 'previous']
    },
    isLoading: { control: 'boolean' },
    priority: { control: 'boolean' }
  }
}
export default meta

type Story = StoryObj<ProductCardEditProps>

const Template: Story = {
  render: (args) => {
    return <ProductCardEditWrapper {...args} />
  }
}

const ProductCardEditWrapper: React.FC<ProductCardEditProps> = (props) => {
  const [isOpenMenu, setOpenMenu] = useState(false)

  return (
    <ProductCardEdit
      {...props}
      isOpenMenu={isOpenMenu}
      onToggleMenu={() => setOpenMenu((o) => !o)}
      onEdit={(id) => console.log('Editar', id)}
      onDelete={(id) => console.log('Excluir', id)}
      onViewReservations={(carav) => console.log('Ver reservas', carav)}
    />
  )
}

export const Defeault: Story = {
  ...Template,
  args: {
    caravan: mockCaravan,
    activeTab: 'upcoming',
    isOpenMenu: false,
    isLoading: false,
    priority: false
  }
}

export const Loading: Story = {
  ...Template,
  name: 'Skeleton (loading)',
  args: {
    caravan: mockCaravan,
    activeTab: 'upcoming',
    isOpenMenu: false,
    isLoading: true,
    priority: false
  }
}

export const PreviousTab: Story = {
  ...Template,
  name: 'Previous (avaliar passageiros)',
  args: {
    caravan: mockCaravan,
    activeTab: 'previous',
    isOpenMenu: false,
    isLoading: false,
    priority: false
  }
}
