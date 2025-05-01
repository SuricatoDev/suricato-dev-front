import React, { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import Tabs, { TabItem } from '.'

type Keys = 'tab1' | 'tab2' | 'tab3'

const defaultItems: TabItem<Keys>[] = [
  { key: 'tab1', label: 'Primeira Aba' },
  { key: 'tab2', label: 'Segunda Aba' }
]

const disabledItems: TabItem<Keys>[] = [
  { key: 'tab1', label: 'Aba A' },
  { key: 'tab2', label: 'Aba B', disabled: true }
]

const customItems: TabItem<Keys>[] = [
  { key: 'tab1', label: <span>⭐ Favoritos</span> },
  {
    key: 'tab2',
    label: <span>🔥 Quentes</span>
  }
]

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    items: { control: false },
    activeKey: { control: false },
    onChange: { control: false }
  }
}
export default meta

type Story = StoryObj<typeof Tabs>

const DefaultComponent: React.FC = () => {
  const [activeKey, setActiveKey] = useState<Keys>('tab1')
  const log = action('onChange')
  return (
    <Tabs<Keys>
      items={defaultItems}
      activeKey={activeKey}
      onChange={(k) => {
        setActiveKey(k)
        log(k)
      }}
    />
  )
}

export const Default: Story = {
  render: () => <DefaultComponent />
}

const WithDisabledComponent: React.FC = () => {
  const [activeKey, setActiveKey] = useState<Keys>('tab1')
  const log = action('onChange')
  return (
    <Tabs<Keys>
      items={disabledItems}
      activeKey={activeKey}
      onChange={(k) => {
        setActiveKey(k)
        log(k)
      }}
    />
  )
}

export const WithDisabled: Story = {
  render: () => <WithDisabledComponent />
}

const CustomLabelsComponent: React.FC = () => {
  const [activeKey, setActiveKey] = useState<Keys>('tab1')
  const log = action('onChange')
  return (
    <Tabs<Keys>
      items={customItems}
      activeKey={activeKey}
      onChange={(k) => {
        setActiveKey(k)
        log(k)
      }}
    />
  )
}

export const CustomLabels: Story = {
  render: () => <CustomLabelsComponent />
}
