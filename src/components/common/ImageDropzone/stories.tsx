import React from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { ImageDropzone, ImageDropzoneProps } from '.'

const meta: Meta<typeof ImageDropzone> = {
  title: 'Components/ImageDropzone',
  component: ImageDropzone,
  tags: ['autodocs'],
  argTypes: {
    initialFiles: { control: false },
    onFilesChange: { action: 'onFilesChange' }
  }
}
export default meta

type Story = StoryObj<typeof ImageDropzone>

export const Default: Story = {
  render: (args) => <ImageDropzone {...args} />,
  args: {},
  parameters: {
    docs: { source: { state: 'open' } }
  }
}

const mockFiles: ImageDropzoneProps['initialFiles'] = [
  {
    id: '1',
    file: new File([], 'mock1.jpg', { type: 'image/jpeg' }),
    previewUrl: 'https://picsum.photos/1920/1080',
    order: 0
  },
  {
    id: '2',
    file: new File([], 'mock2.jpg', { type: 'image/jpeg' }),
    previewUrl: 'https://picsum.photos/1925/1085',
    order: 1
  }
]

export const WithImages: Story = {
  render: (args) => <ImageDropzone {...args} />,
  args: {
    initialFiles: mockFiles
  },
  parameters: {
    docs: { source: { state: 'open' } }
  }
}
