import React, { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import Tabs, { TabItem } from '.'

type Keys = 'tab1' | 'tab2' | 'tab3'

const defaultItems: TabItem<Keys>[] = [
  { key: 'tab1', label: 'Primeira Aba' },
  { key: 'tab2', label: 'Segunda Aba' },
  { key: 'tab3', label: 'Terceira Aba' }
]

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: { items: { control: false } }
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => {
    const TabsWithState = () => {
      const [activeKey, setActiveKey] = useState<Keys>('tab1')
      const log = action('onChange')

      const handleChange = (key: Keys) => {
        setActiveKey(key)
        log(key)
      }

      return (
        <Tabs<Keys>
          items={defaultItems}
          activeKey={activeKey}
          onChange={handleChange}
        />
      )
    }

    return <TabsWithState />
  }
}
