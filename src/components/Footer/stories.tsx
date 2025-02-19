import { Meta, StoryObj } from '@storybook/react'
import Footer, { FooterProps } from '.'

export default {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    brand_name: {
      description: 'Marca'
    },
    logo: {
      description: 'Logo (estrutura do componente Logo)'
    }
  }
} as Meta<FooterProps>

export const Default: StoryObj<FooterProps> = {
  args: {
    brand_name: 'Excursionistas',
    logo: {
      image_url: '',
      image_alt_text: 'Logo',
      logo_link: ''
    }
  }
}
