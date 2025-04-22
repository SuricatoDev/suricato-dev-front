import React, { useMemo } from 'react'

import { useRouter } from 'next/router'

import { useScrollDown } from '@/hooks/useScrollDown'

import { useAuthStatus } from '@/contexts/AuthStatusProvider'

import { MobileFooterNavigation } from './navigation'
import * as S from './styles'

export default function MobileFooter() {
  const { isLogged } = useAuthStatus()

  const { explorar, caravanas, entrar, perfil, anunciar, favoritos } =
    MobileFooterNavigation

  const router = useRouter()
  const scrollingDown = useScrollDown()

  const navItems = useMemo(() => {
    return isLogged
      ? [explorar, favoritos, caravanas, anunciar, perfil]
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
          const shouldLink = router.pathname !== href

          return (
            <S.NavItem
              key={id}
              href={shouldLink ? href : '#'}
              passHref
              $isActive={isActive}
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
