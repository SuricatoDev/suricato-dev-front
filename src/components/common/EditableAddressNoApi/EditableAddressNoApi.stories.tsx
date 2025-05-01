import React, { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { AddressDataNoApi, EditableAddressNoApi } from '.'

const meta: Meta<typeof EditableAddressNoApi> = {
  title: 'Forms/EditableAddressNoApi',
  component: EditableAddressNoApi,
  tags: ['autodocs'],
  argTypes: {
    hasButton: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    address: { control: false },
    setAddress: { control: false },
    onSave: { control: false }
  }
}
export default meta

type Story = StoryObj<typeof EditableAddressNoApi>

const DefaultTemplate: React.FC<{
  hasButton?: boolean
  isLoading?: boolean
}> = ({ hasButton = true, isLoading = false }) => {
  const [address, setAddress] = useState<AddressDataNoApi>({
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: ''
  })

  return (
    <EditableAddressNoApi
      address={address}
      setAddress={(addr) => {
        setAddress(addr)
        action('setAddress')(addr)
      }}
      onSave={() => action('onSave')(address)}
      hasButton={hasButton}
      isLoading={isLoading}
    />
  )
}

export const Default: Story = {
  render: (args) => <DefaultTemplate {...args} />,
  args: {
    hasButton: true,
    isLoading: false
  },
  parameters: {
    docs: {
      source: { type: 'skip' }
    }
  }
}
