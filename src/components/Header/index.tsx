import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MagnifyingGlass, UserCircle } from '@phosphor-icons/react'
import logo from '@/assets/img/logo.png'
import * as S from './styles'
import CategoriesBar from '../CategoriesBar'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleProfileMenu = () => {
    setIsProfileOpen((prev) => !prev)
  }

  return (
    <S.Wrapper $isScrolled={isScrolled}>
      <S.Container>
        <S.TopHeader>
          <Image src={logo} alt="Logo" width={50} height={50} />

          <S.Menu $isScrolled={isScrolled}>
            <a href="#">Explorar</a>
            <a href="#">Anunciar</a>
            <a href="#">Sobre Nós</a>
            <a href="#">Fale Conosco</a>
          </S.Menu>
          <S.ProfileContainer>
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
                  <li>
                    <a href="#">Cadastrar-se</a>
                  </li>
                  <li>
                    <a href="#">Entrar</a>
                  </li>
                  <li>
                    <a href="#">Anuncie sua caravana</a>
                  </li>
                  <li>
                    <a href="#">Central de Ajuda</a>
                  </li>
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
  )
}
