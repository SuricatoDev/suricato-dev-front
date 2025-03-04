import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass'
import { UserCircle } from '@phosphor-icons/react/dist/ssr/UserCircle'
import logo from '@/assets/images/logo.png'
import * as S from './styles'
import CategoriesBar from '../CategoriesBar'
import { HeaderNavigation } from './navigation'
import Divider from '../Divider'
import Portal from '../Portal'
import MultiStepForm from '@/components/LoginForm'

type HeaderProps = {
  simpleHeader?: boolean
}

type ProfileItem =
  | (typeof HeaderNavigation)[keyof typeof HeaderNavigation]
  | 'divider'

export default function Header({ simpleHeader = false }: HeaderProps) {
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

      <S.Wrapper $isScrolled={isScrolled}>
        <S.Container>
          <S.TopHeader>
            <Link href="/" passHref>
              <Image src={logo} alt="Logo" width={50} height={50} />
            </Link>

            {!simpleHeader && (
              <S.Menu $isScrolled={isScrolled}>
                {navItems.map(({ label, href }, index) => (
                  <Link key={`${href}-${label}-${index}`} href={href} passHref>
                    {label}
                  </Link>
                ))}
              </S.Menu>
            )}

            <S.ProfileContainer ref={profileContainerRef}>
              <S.ProfileButton onClick={toggleProfileMenu}>
                <S.Hamburguer $isProfileOpen={isProfileOpen}>
                  <span />
                  <span />
                  <span />
                </S.Hamburguer>
                <UserCircle size={32} weight="fill" />
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
                              onClick={() => handleOptionClick(() => signOut())}
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
        </S.Container>
        <CategoriesBar />
      </S.Wrapper>
    </>
  )
}
