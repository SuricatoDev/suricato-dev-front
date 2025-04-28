import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import 'react-image-gallery/styles/css/image-gallery.css'

import Gallery from '.'

const meta: Meta<typeof Gallery> = {
  title: 'Components/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  argTypes: {
    images: { control: false }
  }
}
export default meta

type Story = StoryObj<typeof Gallery>

const Template: Story['render'] = (args) => <Gallery {...args} />

export const Default: Story = {
  render: Template,
  args: {
    images: [
      `https://picsum.photos/1920/1080`,
      `https://picsum.photos/1600/900`,
      `https://picsum.photos/1366/768`,
      `https://picsum.photos/1280/720`,
      `https://picsum.photos/1080/1920`,
      `https://picsum.photos/750/1334`,
      `https://picsum.photos/414/896`,
      `https://picsum.photos/360/640`
    ]
  },
  parameters: {
    docs: {
      source: {
        type: 'skip'
      }
    }
  }
}
