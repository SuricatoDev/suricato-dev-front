import React, { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import Button from '@/components/common/Button'

import Modal, { ModalProps } from '.'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    withMaxSizes: { control: 'boolean' },
    closeButton: { control: 'boolean' },
    style: { control: 'object' }
  }
}
export default meta

type Story = StoryObj<
  Pick<ModalProps, 'withMaxSizes' | 'closeButton' | 'style'>
>

const Template: React.FC<Story['args']> = (args = {}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Abrir Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        withMaxSizes={args.withMaxSizes}
        closeButton={args.closeButton}
        style={args.style}
      >
        <div style={{ padding: '0 1.5rem 1.5rem', textAlign: 'center' }}>
          <h2>Conteúdo do modal</h2>
          <p>Este é um conteúdo simples para demonstrar a modal.</p>
        </div>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    withMaxSizes: true,
    closeButton: true,
    style: {}
  }
}

export const NoCloseButton: Story = {
  render: (args) => <Template {...args} />,
  name: 'Sem botão de fechar',
  args: {
    withMaxSizes: true,
    closeButton: false,
    style: {}
  }
}

export const NoMaxSizes: Story = {
  render: (args) => <Template {...args} />,
  name: 'Sem limitações de tamanho',
  args: {
    withMaxSizes: false,
    closeButton: true,
    style: {}
  }
}

export const CustomSizeAndStyle: Story = {
  render: (args) => <Template {...args} />,
  name: 'Tamanho e estilo customizados',
  args: {
    withMaxSizes: true,
    closeButton: false,
    style: {
      width: '80vw',
      maxWidth: 'none',
      height: '60vh',
      backgroundColor: '#f0f5ff',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
    }
  }
}

const LongContentTemplate: React.FC<
  Pick<ModalProps, 'withMaxSizes' | 'closeButton' | 'style'>
> = ({ withMaxSizes, closeButton, style }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Abrir Modal com conteúdo longo
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        withMaxSizes={withMaxSizes}
        closeButton={closeButton}
        style={style}
      >
        <div style={{ padding: '0 1.5rem 1.5rem' }}>
          <h2>Exemplo de conteúdo extenso</h2>
          {Array.from({ length: 20 }).map((_, idx) => (
            <p key={idx}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum vehicula ex eu quam ultricies, quis tincidunt mauris
              fermentum. Donec non lorem nec erat tincidunt malesuada. Integer
              euismod pulvinar lectus, sed venenatis lorem tincidunt non. Sed
              sit amet nibh a metus tempus finibus. Duis ac orci eu metus
              aliquet volutpat. Quisque et velit at orci hendrerit viverra eget
              non magna. In hac habitasse platea dictumst. Praesent nec nibh id
              libero scelerisque imperdiet. Curabitur vel vehicula lorem.
            </p>
          ))}
        </div>
      </Modal>
    </>
  )
}

export const LongContent: Story = {
  name: 'Conteúdo longo (scroll)',
  render: (args) => <LongContentTemplate {...args} />,
  args: {
    withMaxSizes: true,
    closeButton: true,
    style: {}
  },
  parameters: {
    docs: {
      storyDescription:
        'Este exemplo abre o modal com muito texto e permite fechá-lo clicando no X ou no overlay, testando o scroll interno.'
    }
  }
}
