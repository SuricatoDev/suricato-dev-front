import { Meta, StoryObj } from '@storybook/react'
import Header, { HeaderProps } from '.'

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    menu_items: {
      description: 'Lista de items do menu'
    },
    have_switcher_theme: {
      description: 'Seletor de modo dark (se houver)'
    },
    cta_label: {
      description: 'Texto do cta principal'
    },
    cta_link: {
      description: 'Link do cta principal'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100px', width: '100%' }}>
        <Story />
      </div>
    )
  ]
} as Meta<HeaderProps>

export const Default: StoryObj<HeaderProps> = {
  args: {
    menu_items: [
      { label: 'Categoria 1', url: '#categoria1' },
      { label: 'Categoria 2', url: '#categoria2' },
      { label: 'Categoria 3', url: '#categoria3' },
      { label: 'Categoria 4', url: '#categoria4' }
    ],
    cta_label: 'Inscreva-se',
    cta_link: '#',
    logo: {
      image_url: '',
      image_alt_text: 'Logo',
      logo_link: '#'
    },
    have_switcher_theme: false
  }
}
