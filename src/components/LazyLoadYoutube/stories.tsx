import { Meta, StoryObj } from '@storybook/react'
import LazyLoadYouTube, { LazyLoadYouTubeProps } from '.'

export default {
  title: 'Components/LazyLoad YouTube',
  component: LazyLoadYouTube,
  argTypes: {
    video_url: {
      control: 'text',
      description: 'URL do vídeo no YouTube',
      defaultValue: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    thumbnail_url: {
      control: 'text',
      description: 'URL customizada da miniatura do vídeo'
    },
    altText: {
      control: 'text',
      description: 'Texto alternativo para a miniatura',
      defaultValue: 'Rick Astley - Never Gonna Give You Up'
    },
    width: {
      control: 'number',
      description: 'Largura da miniatura/vídeo embedado',
      defaultValue: 960
    },
    height: {
      control: 'number',
      description: 'Altura da miniatura/vídeo embedado',
      defaultValue: 540
    },
    background_color: {
      control: 'color',
      description: 'Cor de fundo antes do carregamento do vídeo',
      defaultValue: '#000000'
    },
    onClick: {
      action: 'clicked',
      description: 'Ação executada quando o vídeo é iniciado'
    }
  }
} as Meta<LazyLoadYouTubeProps>

export const Default: StoryObj<LazyLoadYouTubeProps> = {
  args: {
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    altText: 'Texto alternativo',
    width: 960,
    height: 540,
    background_color: '#000000'
  }
}
