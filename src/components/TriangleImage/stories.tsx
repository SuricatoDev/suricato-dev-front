import { Meta, StoryObj } from '@storybook/react'
import TriangleImage, { TriangleImageProps } from '.'

export default {
  title: 'Components/TriangleImage',
  component: TriangleImage,

  argTypes: {
    image_url: {
      description: 'Link da imagem a ser exibida'
    },
    text_alt: {
      description: 'Texto alternativo para a imagem (alt text)'
    }
  }
} as Meta<TriangleImageProps>

export const Default: StoryObj<TriangleImageProps> = {
  args: {
    image_url:
      'https://bluecore00kroton.blob.core.windows.net/kroton-default/assets/md_shutterstock_1575501976_042f8ef32f.jpeg',
    text_alt: 'Texto alternativo'
  }
}
