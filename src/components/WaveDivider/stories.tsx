import { Meta, StoryObj } from '@storybook/react'
import WaveDivider, { WaveDividerProps } from '.'

export default {
  title: 'Components/WaveDivider',
  component: WaveDivider,
  argTypes: {
    position: {
      description: 'Posicionamento da onda'
    },
    background: {
      control: 'color',
      description: 'Cor de background'
    },
    fill: {
      control: 'color',
      description: 'Cor da onda'
    }
  }
} as Meta<WaveDividerProps>

export const Default: StoryObj<WaveDividerProps> = {
  args: {
    position: 'top',
    fill: '#ff2800',
    background: '#FFFFFF'
  }
}

export const PositionBottom: StoryObj<WaveDividerProps> = {
  args: {
    position: 'bottom',
    fill: '#ff2800',
    background: '#FFFFFF'
  }
}
