import { Meta, StoryObj } from '@storybook/react'

import RatingStars from '.'

const meta: Meta<typeof RatingStars> = {
  title: 'Components/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'text' },
      description: 'A avaliação pode ser um número, string (ex: "3.5") ou null',
      defaultValue: '4'
    }
  }
}
export default meta

type Story = StoryObj<typeof RatingStars>

export const Default: Story = {
  args: {
    rating: 4
  }
}

export const AsString: Story = {
  args: {
    rating: '3.5'
  }
}

export const NoRating: Story = {
  args: {
    rating: null
  }
}
