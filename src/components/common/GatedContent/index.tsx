import { ReactNode } from 'react'

import { LockKey } from '@phosphor-icons/react/dist/ssr/LockKey'

import * as S from './styles'

interface GatedContentProps {
  isLogged: boolean
  onClick: () => void
  children: ReactNode
}

export default function GatedContent({
  isLogged,
  onClick,
  children
}: GatedContentProps) {
  return (
    <S.GatedContainer onClick={onClick}>
      {children}
      {!isLogged && (
        <S.OverlayWrapper>
          <S.Overlay>
            <span>
              <LockKey size={32} weight="fill" />
              Faça login para visualizar
            </span>
          </S.Overlay>
        </S.OverlayWrapper>
      )}
    </S.GatedContainer>
  )
}
