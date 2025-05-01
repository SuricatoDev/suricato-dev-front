/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { AuthStatusContext } from '@/contexts/AuthStatusProvider'

import ProductCard, { ProductCardProps } from '.'

const mockImages = [
  'https://picsum.photos/seed/1/400/300',
  'https://picsum.photos/seed/2/400/300',
  'https://picsum.photos/seed/3/400/300'
]

const baseArgs: Omit<ProductCardProps, 'onToggleFavorite'> = {
  images: mockImages,
  name: 'Trilha na Montanha',
  origin: 'Porto Alegre, RS',
  destination: 'Gramado, RS',
  date: '15/07/2025',
  price: 299,
  href: '/caravana/1',
  priority: false,
  isLoading: false
}

const makeAuthDecorator = (isLogged: boolean) => {
  function AuthDecorator({ story }: { story: React.ReactNode }) {
    return (
      <AuthStatusContext.Provider
        value={{
          isLogged,
          status: isLogged ? 'authenticated' : 'unauthenticated'
        }}
      >
        <div style={{ width: 320, margin: '2rem auto' }}>{story}</div>
      </AuthStatusContext.Provider>
    )
  }
  AuthDecorator.displayName = `AuthDecorator(${isLogged})`
  return (Story: any) => <AuthDecorator story={<Story />} />
}

const meta: Meta<ProductCardProps> = {
  title: 'Sections/ProductCard',
  component: ProductCard,
  argTypes: {
    priority: { control: 'boolean' },
    isLoading: { control: 'boolean' }
  }
}
export default meta

type Story = StoryObj<ProductCardProps>

export const Dfeault: Story = {
  decorators: [makeAuthDecorator(true)],
  render: (args) => <StatefulCard {...args} />,
  args: {
    ...baseArgs,
    isFavorited: false
  }
}

const StatefulCard: React.FC<ProductCardProps> = (args) => {
  const [fav, setFav] = useState(args.isFavorited || false)
  return (
    <ProductCard
      {...args}
      isFavorited={fav}
      onToggleFavorite={() => setFav((prev) => !prev)}
    />
  )
}

export const LoggedOut: Story = {
  name: 'Usuário não logado',
  decorators: [makeAuthDecorator(false)],
  render: (args) => <StatefulCard {...args} />,
  args: {
    ...baseArgs,
    isFavorited: false
  }
}

export const LoggedIn: Story = {
  name: 'Usuário logado (não favoritado)',
  decorators: [makeAuthDecorator(true)],
  render: (args) => <StatefulCard {...args} />,
  args: {
    ...baseArgs,
    isFavorited: false
  }
}

export const LoggedInFavorited: Story = {
  name: 'Usuário logado (já favoritado)',
  decorators: [makeAuthDecorator(true)],
  render: (args) => <StatefulCard {...args} />,
  args: {
    ...baseArgs,
    isFavorited: true
  }
}

export const Loading: Story = {
  name: 'Loading (skeleton)',
  decorators: [makeAuthDecorator(true)],
  render: (args) => <StatefulCard {...args} />,
  args: {
    ...baseArgs,
    isLoading: true,
    isFavorited: false
  }
}
