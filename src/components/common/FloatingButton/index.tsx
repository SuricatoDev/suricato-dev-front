import React from 'react'
import * as S from './styles'
import { useRouter } from 'next/router'
import { Plus } from '@phosphor-icons/react/dist/ssr/Plus'

interface FloatingActionButtonProps {
  onClick: () => void
}

export default function FloatingActionButton({
  onClick
}: FloatingActionButtonProps) {
  const router = useRouter()

  return (
    <S.FloatingButton onClick={onClick}>
      <Plus size={28} weight="bold" />
    </S.FloatingButton>
  )
}
