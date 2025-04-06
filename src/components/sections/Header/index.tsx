import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass'
import UserCircle from '@/assets/icons/user-circle-fill.svg'
import logo from '@/assets/images/logo.png'
import * as S from './styles'
import CategoriesBar from '@/components/common/CategoriesBar'
import { HeaderNavigation } from './navigation'
import Divider from '@/components/common/Divider'
import Portal from '@/components/common/Portal'
import MultiStepForm from '@/components/sections/LoginForm'
import Image from 'next/image'

export type HeaderProps = {
  $variant?: 'default' | 'simple'
}

type ProfileItem =
  | (typeof HeaderNavigation)[keyof typeof HeaderNavigation]
  | 'divider'

export default function Header({ $variant = 'default' }: HeaderProps) {
  const { data: session } = useSession()
  const isLogged = !!session

  const [isScrolled, setIsScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
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
    viagens,
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
    return [explorar, anunciar, sobre, faq]
  }, [isLogged])

  const profileItems: ProfileItem[] = useMemo(() => {
    return isLogged
      ? [
          viagens,
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
            <Link href="/" passHref>
              <S.Logo src={logo} alt="Logo" width={50} height={50} />
            </Link>

            <S.Menu $isScrolled={isScrolled && $variant === 'default'}>
              {navItems.map(({ label, href }, index) => (
                <Link key={`${href}-${label}-${index}`} href={href} passHref>
                  {label}
                </Link>
              ))}
            </S.Menu>

            <S.ProfileContainer ref={profileContainerRef}>
              <S.ProfileButton onClick={toggleProfileMenu}>
                <S.Hamburguer $isProfileOpen={isProfileOpen}>
                  <span />
                  <span />
                  <span />
                </S.Hamburguer>
                <S.ProfilePic>
                  <Image
                    width={32}
                    height={32}
                    style={{ borderRadius: '50%' }}
                    src={
                      isLogged && session?.user?.foto_perfil
                        ? session.user.foto_perfil
                        : UserCircle
                    }
                    alt="Profile"
                  />
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
              <S.Search $isScrolled={isScrolled}>
                <S.SearchInput
                  type="search"
                  placeholder="Digite o nome da cidade"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <S.SearchButton $isScrolled={isScrolled}>
                  <MagnifyingGlass size={20} weight="bold" />
                  <span>Buscar</span>
                </S.SearchButton>
              </S.Search>
            </S.SearchWrapper>
          )}
        </S.Container>
        {$variant === 'simple' && <Divider />}
        {$variant === 'default' && <CategoriesBar />}
      </S.Wrapper>
    </>
  )
}
