import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { AddressData, EditableAddress } from './'

const meta: Meta<typeof EditableAddress> = {
  title: 'Forms/EditableAddress',
  component: EditableAddress,
  tags: ['autodocs'],
  argTypes: {
    activeSearch: {
      control: 'boolean',
      description: 'Habilita busca automática de CEP'
    },
    disableFields: {
      control: 'boolean',
      description: 'Bloqueia edição de campos auto-preenchidos'
    },
    isLoading: {
      control: 'boolean',
      description: 'Exibe estado de loading no botão'
    },
    hasButton: {
      control: 'boolean',
      description: 'Exibe ou oculta o botão Salvar'
    },
    buttonFullWidth: {
      control: 'boolean',
      description: 'Força botão a ocupar 100% da largura'
    }
  }
}
export default meta

type Story = StoryObj<typeof EditableAddress>

const Template: React.FC<Story['args']> = (args) => {
  const [address, setAddress] = useState<AddressData>({
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    complement: '',
    number: ''
  })

  return (
    <EditableAddress
      {...args}
      address={address}
      setAddress={setAddress}
      onSave={() => {
        alert('Endereço salvo: ' + JSON.stringify(address, null, 2))
      }}
    />
  )
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    activeSearch: true,
    disableFields: true,
    isLoading: false,
    hasButton: true,
    buttonFullWidth: false
  }
}

export const NoSearch: Story = {
  render: (args) => <Template {...args} />,
  args: {
    ...Default.args,
    activeSearch: false
  }
}

export const EditingEnabled: Story = {
  render: (args) => <Template {...args} />,
  args: {
    ...Default.args,
    disableFields: false
  }
}

export const Loading: Story = {
  render: (args) => <Template {...args} />,
  args: {
    ...Default.args,
    isLoading: true
  }
}
