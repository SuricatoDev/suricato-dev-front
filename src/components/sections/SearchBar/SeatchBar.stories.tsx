import { Caravan } from '@/interfaces/caravan'
import { Meta, StoryObj } from '@storybook/react'

import SearchBar, { SearchBarProps } from '.'

const mockCaravans: Caravan[] = [
  {
    id: '1',
    titulo: 'Caminho das Águas',
    descricao: '',
    categoria: '',
    data_partida: '2025-07-01T08:00:00Z',
    data_retorno: '2025-07-05T18:00:00Z',
    endereco_origem: '',
    numero_origem: '',
    bairro_origem: '',
    cep_origem: '',
    cidade_origem: 'Porto Alegre',
    estado_origem: 'RS',
    endereco_destino: '',
    numero_destino: '',
    bairro_destino: '',
    cep_destino: '',
    cidade_destino: 'Canela',
    estado_destino: 'RS',
    numero_vagas: 0,
    valor: 0,
    organizador_id: 0,
    imagens: []
  },
  {
    id: '2',
    titulo: 'Trilha do Sol',
    descricao: '',
    categoria: '',
    data_partida: '2025-08-10T08:00:00Z',
    data_retorno: '2025-08-12T18:00:00Z',
    endereco_origem: '',
    numero_origem: '',
    bairro_origem: '',
    cep_origem: '',
    cidade_origem: 'Gramado',
    estado_origem: 'RS',
    endereco_destino: '',
    numero_destino: '',
    bairro_destino: '',
    cep_destino: '',
    cidade_destino: 'Canela',
    estado_destino: 'RS',
    numero_vagas: 0,
    valor: 0,
    organizador_id: 0,
    imagens: []
  }
]

const decoratorStyle: React.CSSProperties = {
  height: '500px',
  margin: '2rem auto'
}

const meta: Meta<SearchBarProps> = {
  title: 'Sections/SearchBar',
  component: SearchBar,
  decorators: [
    (Story) => (
      <div style={decoratorStyle}>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs'],
  argTypes: {
    isScrolled: {
      control: 'boolean',
      description: 'Simula estado de scroll na página'
    },
    caravanas: {
      control: 'object',
      description: 'Lista de caravanas para sugerir'
    }
  }
}
export default meta

type Story = StoryObj<SearchBarProps>

export const Default: Story = {
  args: {
    isScrolled: false,
    caravanas: mockCaravans
  }
}

export const Scrolled: Story = {
  name: 'Com isScrolled = true',
  args: {
    isScrolled: true,
    caravanas: mockCaravans
  }
}

export const NoSuggestions: Story = {
  name: 'Sem caravana (sem sugestões)',
  args: {
    isScrolled: false,
    caravanas: []
  }
}
