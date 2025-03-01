import { useState } from 'react'
import {
  MagnifyingGlass,
  Heart,
  Van,
  UserCircle
} from '@phosphor-icons/react/dist/ssr'
import * as S from './styles'
import { useScrollDown } from '@/hooks/useScrollDown'

const navItems = [
  { id: 'explorar', label: 'Explorar', icon: MagnifyingGlass },
  { id: 'favoritos', label: 'Favoritos', icon: Heart },
  { id: 'viagens', label: 'Viagens', icon: Van },
  { id: 'perfil', label: 'Perfil', icon: UserCircle }
]

export default function MobileFooter() {
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
