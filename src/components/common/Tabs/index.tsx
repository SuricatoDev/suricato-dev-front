import React from 'react'

import * as S from './styles'

export type TabKey = 'upcoming' | 'previous'

interface TabsProps {
  activeTab: TabKey
  onChange: (tab: TabKey) => void
  disablePrevious?: boolean
}

export default function Tabs({
  activeTab,
  onChange,
  disablePrevious
}: TabsProps) {
  const handleClick = (tab: TabKey) => {
    if (tab === 'previous' && disablePrevious) {
      return
    }
    onChange(tab)
  }

  return (
    <S.TabsWrapper>
      <S.TabsList>
        <S.TabItem
          $active={activeTab === 'upcoming'}
          onClick={() => handleClick('upcoming')}
        >
          Próximas Caravanas
        </S.TabItem>
        <S.TabItem
          $active={activeTab === 'previous'}
          disabled={disablePrevious}
          onClick={() => handleClick('previous')}
        >
          Caravanas Anteriores
        </S.TabItem>
      </S.TabsList>
    </S.TabsWrapper>
  )
}
