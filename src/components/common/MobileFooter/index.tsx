import { useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass'
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart'
import { Van } from '@phosphor-icons/react/dist/ssr/Van'
import { UserCircle } from '@phosphor-icons/react/dist/ssr/UserCircle'

import * as S from './styles'
import { useScrollDown } from '@/hooks/useScrollDown'

type MobileFooterProps = {
  $logged: boolean
}

export default function MobileFooter({ $logged }: MobileFooterProps) {
  const navItems = $logged
    ? [
        { id: 'explorar', label: 'Explorar', icon: MagnifyingGlass },
        { id: 'favoritos', label: 'Favoritos', icon: Heart },
        { id: 'viagens', label: 'Viagens', icon: Van },
        { id: 'perfil', label: 'Perfil', icon: UserCircle }
      ]
    : [
        { id: 'explorar', label: 'Explorar', icon: MagnifyingGlass },
        { id: 'favoritos', label: 'Favoritos', icon: Heart },
        { id: 'entrar', label: 'Entrar', icon: UserCircle }
      ]

  const [activeItem, setActiveItem] = useState('explorar')

  const scrollingDown = useScrollDown()

  return (
    <S.FooterWrapper $isScrollingDown={scrollingDown}>
      <S.Nav>
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = id === activeItem

          return (
            <S.NavItem
              key={id}
              $isActive={isActive}
              onClick={() => setActiveItem(id)}
            >
              <Icon size={24} weight={isActive ? 'bold' : 'regular'} />
              <S.NavLabel $isActive={isActive}>{label}</S.NavLabel>
            </S.NavItem>
          )
        })}
      </S.Nav>
    </S.FooterWrapper>
  )
}
