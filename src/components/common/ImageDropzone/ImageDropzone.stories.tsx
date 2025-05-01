import { Meta, StoryObj } from '@storybook/react'

import { ImageDropzone, ImageDropzoneProps } from '.'

const mockFiles = (count: number): ImageDropzoneProps['initialFiles'] =>
  Array.from({ length: count }).map((_, i) => ({
    id: String(i + 1),
    file: new File([], `mock${i + 1}.jpg`, { type: 'image/jpeg' }),
    previewUrl: `https://picsum.photos/seed/${i + 1}/300/200`,
    order: i
  }))

export default {
  title: 'Components/ImageDropzone',
  component: ImageDropzone,
  tags: ['autodocs'],
  argTypes: {
    initialFiles: { control: false },
    onFilesChange: { action: 'onFilesChange' }
  }
} as Meta<ImageDropzoneProps>

type Story = StoryObj<ImageDropzoneProps>

export const Default: Story = {
  args: {
    initialFiles: [],
    maxWidth: '400px'
  }
}

export const SingleImage: Story = {
  args: {
    initialFiles: mockFiles(1),
    maxWidth: '400px'
  }
}

export const TwoImages: Story = {
  args: {
    initialFiles: mockFiles(2),
    maxWidth: '400px'
  }
}

export const FiveImages: Story = {
  args: {
    initialFiles: mockFiles(5),
    maxWidth: '400px'
  }
}

export const LotsOfImages: Story = {
  args: {
    initialFiles: mockFiles(15),
    maxWidth: '400px'
  }
}
