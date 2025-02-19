import { Meta, StoryObj } from '@storybook/react'
import Logo, { LogoProps } from '.'

export default {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    image_url: {
      description: 'Url da imagem da logo padrão'
    },
    image_alt_text: {
      description: 'Texto alternativo da imagem (alt text)'
    },
    size: {
      description: 'Tamanho da logo no mobile'
    },
    logo_link: {
      description: 'Url do redirecionamento ao clicar na logo'
    },
    contrast: {
      description: 'Deixar a imagem branca'
    },
    target: {
      description: 'Target da logo, se deve abrir em nova guia ou não'
    }
  }
} as Meta<LogoProps>

export const Default: StoryObj<LogoProps> = {
  args: {
    logo_link: 'https://www.example.com/',
    image_url: '#',
    image_alt_text: 'Logo',
    target: '_self',
    contrast: false
  }
}

export const Contrast: StoryObj<LogoProps> = {
  args: {
    logo_link: 'https://www.example.com/',
    image_url: '#',
    image_alt_text: 'Logo',
    target: '_self',
    contrast: true
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
