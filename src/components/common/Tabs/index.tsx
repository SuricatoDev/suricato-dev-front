import React from 'react'

import * as S from './styles'

export interface TabItem<T extends string> {
  key: T
  label: React.ReactNode
  disabled?: boolean
}

interface TabsProps<T extends string> {
  items: TabItem<T>[]
  activeKey: T
  onChange: (key: T) => void
}

export default function Tabs<T extends string>({
  items,
  activeKey,
  onChange
}: TabsProps<T>) {
  return (
    <S.TabsWrapper>
      <S.TabsList>
        {items.map(({ key, label, disabled }) => (
          <S.TabItem
            key={key}
            $active={activeKey === key}
            $disabled={disabled}
            onClick={() => !disabled && onChange(key)}
          >
            {label}
          </S.TabItem>
        ))}
      </S.TabsList>
    </S.TabsWrapper>
  )
}
