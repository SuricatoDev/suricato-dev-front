// src/components/common/Skeleton/stories.tsx
import { Meta, StoryObj } from '@storybook/react'

import Skeleton, { SkeletonProps } from '.'

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Número de linhas de itens de skeleton'
    },
    columns: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Número de colunas de itens de skeleton'
    },
    width: {
      control: 'text',
      description: 'Largura de cada bloco (CSS string, ex: "100%", "50px")'
    },
    height: {
      control: 'text',
      description: 'Altura de cada bloco (CSS string, ex: "0.875rem", "20px")'
    },
    gap: {
      control: 'text',
      description: 'Espaçamento entre itens (CSS string, ex: "8px")'
    },
    radius: {
      control: 'text',
      description: 'Border-radius de cada bloco (CSS string, ex: "4px")'
    }
  }
} as Meta<SkeletonProps>

type Story = StoryObj<SkeletonProps>

export const Default: Story = {
  args: {
    // usa os defaults: 1 linha x 1 coluna
  }
}

export const MultipleRows: Story = {
  args: {
    rows: 3,
    columns: 1
  }
}

export const MultipleColumns: Story = {
  args: {
    rows: 1,
    columns: 4
  }
}

export const Grid: Story = {
  args: {
    rows: 3,
    columns: 3,
    gap: '12px'
  }
}

export const CustomSize: Story = {
  args: {
    rows: 2,
    columns: 2,
    width: '50%',
    height: '1.5rem'
  }
}

export const Rounded: Story = {
  args: {
    rows: 2,
    columns: 3,
    gap: '16px',
    radius: '8px'
  }
}
