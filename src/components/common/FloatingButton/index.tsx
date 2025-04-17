import React from 'react'

import { Plus } from '@phosphor-icons/react/dist/ssr/Plus'

import * as S from './styles'

interface FloatingActionButtonProps {
  onClick: () => void
  footerVisible: boolean
}

export default function FloatingActionButton({
  onClick,
  footerVisible
}: FloatingActionButtonProps) {
  return (
    <S.FloatingButton onClick={onClick} $footerVisible={footerVisible}>
      <Plus size={28} weight="bold" />
    </S.FloatingButton>
  )
}
