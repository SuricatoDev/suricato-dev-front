import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import * as S from './styles'
import { useScrollDown } from '@/hooks/useScrollDown'
import { MobileFooterNavigation } from './navigation'

export default function MobileFooter() {
  const { data: session } = useSession()
  const isLogged = !!session
  const { explorar, caravanas, entrar, perfil, anunciar } =
    MobileFooterNavigation

  const router = useRouter()
  const scrollingDown = useScrollDown()

  const navItems = useMemo(() => {
    return isLogged
      ? [explorar, caravanas, anunciar, perfil]
      : [explorar, entrar]
  }, [isLogged])

  const activeItem = useMemo(() => {
    if (router.pathname === '/cadastrar-empresa') return 'anunciar'
    const currentItem = navItems.find((item) => item.href === router.pathname)
    return currentItem ? currentItem.id : 'explorar'
  }, [router.pathname, navItems])

  return (
    <S.FooterWrapper
      id="mobile-footer"
      className="main-footer"
      $isScrollingDown={scrollingDown}
    >
      <S.Nav>
        {navItems.map(({ id, label, icon: Icon, href }) => {
          const isActive = id === activeItem
          return (
            <S.NavItem key={id} href={href} passHref $isActive={isActive}>
              <Icon size={24} weight={isActive ? 'bold' : 'regular'} />
              <S.NavLabel $isActive={isActive}>{label}</S.NavLabel>
            </S.NavItem>
          )
        })}
      </S.Nav>
    </S.FooterWrapper>
  )
}
