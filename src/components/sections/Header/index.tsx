import { useEffect, useMemo, useRef, useState } from 'react'

import UserCircleSvg from '@/assets/icons/user-circle-fill.svg'
import logo from '@/assets/images/logo.png'
import { Caravan } from '@/interfaces/caravan'
import { signOut, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { UserCircle } from '@phosphor-icons/react/dist/ssr/UserCircle'

import { useAuthStatus } from '@/contexts/AuthStatusProvider'

import Divider from '@/components/common/Divider'
import Portal from '@/components/common/Portal'
import ThemeToggle from '@/components/common/ThemeToggle'
import CategoriesBar from '@/components/sections/CategoriesBar'

import ResponsiveSearchBar from '../SearchBar'
import { HeaderNavigation } from './navigation'
import * as S from './styles'

const MultiStepForm = dynamic(() => import('@/components/sections/LoginForm'), {
  ssr: false
})

export type HeaderProps = {
  $variant?: 'default' | 'simple'
  caravanas?: Caravan[]
}

type ProfileItem =
  | (typeof HeaderNavigation)[keyof typeof HeaderNavigation]
  | 'divider'

export default function Header({
  $variant = 'default',
  caravanas
}: HeaderProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { isLogged } = useAuthStatus()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const profileContainerRef = useRef<HTMLDivElement>(null)

  const openLoginModal = () => setIsLoginModalOpen(true)

  const {
    cadastrar,
    entrar,
    oferecer,
    faq,
    conta,
    reservas,
    favoritos,
    sair,
    editar,
    explorar,
    sobre,
    anunciar
  } = HeaderNavigation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isProfileOpen &&
        profileContainerRef.current &&
        !profileContainerRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileOpen])

  const toggleProfileMenu = () => {
    setIsProfileOpen((prev) => !prev)
  }

  const navItems = useMemo(() => {
    return isLogged
      ? [explorar, favoritos, reservas, anunciar, sobre, faq]
      : [explorar, anunciar, sobre, faq]
  }, [isLogged])

  const profileItems: ProfileItem[] = useMemo(() => {
    return isLogged
      ? [
          reservas,
          favoritos,
          'divider',
          editar,
          oferecer,
          conta,
          'divider',
          faq,
          sair
        ]
      : [cadastrar, entrar, 'divider', oferecer, faq]
  }, [isLogged])

  const handleOptionClick = (onClick?: () => void) => {
    if (onClick) onClick()
    setIsProfileOpen(false)
  }

  return (
    <>
      {isLoginModalOpen && (
        <Portal>
          <MultiStepForm
            $isModal
            $isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        </Portal>
      )}

      <S.Wrapper $variant={$variant} $isScrolled={isScrolled}>
        <S.Container>
          <S.TopHeader>
            <Link href="/" passHref style={{ display: 'flex', width: '118px' }}>
              <S.Logo src={logo} alt="Logo" width={60} height={60} />
            </Link>

            <S.Menu $isScrolled={isScrolled && $variant === 'default'}>
              {navItems.map(({ label, href }, index) => (
                <Link key={`${href}-${label}-${index}`} href={href} passHref>
                  <S.MenuLink $active={router.pathname === href}>
                    {label}
                  </S.MenuLink>
                </Link>
              ))}
            </S.Menu>

            <S.ProfileContainer ref={profileContainerRef}>
              <ThemeToggle />
              <S.ProfileButton onClick={toggleProfileMenu}>
                <S.Hamburguer $isProfileOpen={isProfileOpen}>
                  <span />
                  <span />
                  <span />
                </S.Hamburguer>
                <S.ProfilePic>
                  {isLogged && session?.user?.foto_perfil ? (
                    <Image
                      width={32}
                      height={32}
                      style={{ borderRadius: '50%' }}
                      src={
                        isLogged && session?.user?.foto_perfil
                          ? session.user.foto_perfil
                          : UserCircleSvg.src
                      }
                      alt="Profile"
                    />
                  ) : (
                    <UserCircle
                      className="profile-svg"
                      width={32}
                      height={32}
                    />
                  )}
                </S.ProfilePic>
              </S.ProfileButton>

              {isProfileOpen && (
                <S.ProfileMenu>
                  <ul>
                    {profileItems.map((item, index) =>
                      item === 'divider' ? (
                        <Divider $marginY="8px" key={`divider-${index}`} />
                      ) : (
                        <li
                          key={`profileItem-${item.href}-${item.value}-${index}`}
                        >
                          {item.value === 'cadastrar' ||
                          item.value === 'entrar' ? (
                            <S.MenuItem
                              as="button"
                              onClick={() => handleOptionClick(openLoginModal)}
                              $isBold={item.isBold}
                            >
                              {item.label}
                            </S.MenuItem>
                          ) : item.value === 'sair' ? (
                            <S.MenuItem
                              as="button"
                              onClick={() =>
                                handleOptionClick(() => {
                                  signOut({ callbackUrl: '/' })
                                })
                              }
                              $isBold={item.isBold}
                            >
                              {item.label}
                            </S.MenuItem>
                          ) : (
                            <S.MenuItem
                              as={Link}
                              href={item.href}
                              passHref
                              onClick={() => handleOptionClick()}
                              $isBold={item.isBold}
                            >
                              {item.label}
                            </S.MenuItem>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </S.ProfileMenu>
              )}
            </S.ProfileContainer>
          </S.TopHeader>

          {$variant === 'default' && (
            <S.SearchWrapper $isScrolled={isScrolled}>
              <ResponsiveSearchBar
                isScrolled={isScrolled}
                caravanas={caravanas}
              />
            </S.SearchWrapper>
          )}
        </S.Container>
        {$variant === 'simple' && <Divider />}
        {$variant === 'default' && <CategoriesBar />}
      </S.Wrapper>
    </>
  )
}
