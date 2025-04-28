import React, { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import Modal, { ModalProps } from '.'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    $withMaxSizes: { control: 'boolean' },
    closeButton: { control: 'boolean' },
    style: { control: 'object' }
  }
}
export default meta

type Story = StoryObj<typeof Modal>

const DefaultTemplate: React.FC<
  Pick<ModalProps, '$withMaxSizes' | 'closeButton' | 'style'>
> = ({ $withMaxSizes, closeButton, style }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Abrir Modal</button>

      <Modal
        $isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        $withMaxSizes={$withMaxSizes}
        closeButton={closeButton}
        style={style}
      >
        <div style={{ padding: 20, textAlign: 'center' }}>
          <h2>Conteúdo do modal</h2>
        </div>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: (args) => <DefaultTemplate {...args} />,
  args: {
    $withMaxSizes: true,
    closeButton: true,
    style: {}
  },
  parameters: {
    docs: {
      source: { state: 'open' }
    }
  }
}
