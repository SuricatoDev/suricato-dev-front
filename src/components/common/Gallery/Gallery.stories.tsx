import { Meta, StoryObj } from '@storybook/react'

import Gallery, { GalleryProps } from '.'

const sampleImages = [
  'https://picsum.photos/seed/1/600/400',
  'https://picsum.photos/seed/2/600/400',
  'https://picsum.photos/seed/3/600/400',
  'https://picsum.photos/seed/4/600/400',
  'https://picsum.photos/seed/5/600/400',
  'https://picsum.photos/seed/6/600/400',
  'https://picsum.photos/seed/7/600/400',
  'https://picsum.photos/seed/8/600/400',
  'https://picsum.photos/seed/9/600/400',
  'https://picsum.photos/seed/10/600/400'
]

export default {
  title: 'Components/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  argTypes: {
    images: {
      control: 'object',
      description: 'Array de URLs de imagem para exibir na galeria'
    }
  }
} as Meta<GalleryProps>

type Story = StoryObj<GalleryProps>

export const Default: Story = {
  args: {
    images: sampleImages.slice(0, 6)
  }
}

export const SingleImage: Story = {
  name: 'Única imagem',
  args: {
    images: [sampleImages[0]]
  }
}

export const TwoImages: Story = {
  name: '2 imagens',
  args: {
    images: sampleImages.slice(0, 2)
  }
}

export const ThreeImages: Story = {
  name: '3 imagens',
  args: {
    images: sampleImages.slice(0, 3)
  }
}

export const FourImages: Story = {
  name: '4 imagens',
  args: {
    images: sampleImages.slice(0, 4)
  }
}

export const FiveImages: Story = {
  name: '5 imagens',
  args: {
    images: sampleImages.slice(0, 5)
  }
}

export const WithOverlay: Story = {
  name: '> 5 imagens (com overlay no desktop)',
  args: {
    images: sampleImages.slice(0, 7)
  }
}
