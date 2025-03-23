// components/HeaderNav.tsx
import React from 'react'
import * as S from './styles'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'

interface HeaderNavProps {
  showDoubtsButton?: boolean
}

export default function HeaderNav({ showDoubtsButton = true }: HeaderNavProps) {
  const handleExit = () => {}

  const handleHelp = () => {}

  return (
    <S.HeaderNavContainer>
      <S.LogoContainer>
        <Link href="/" passHref>
          <S.Logo src={logo} alt="Logo" width={40} height={40} />
        </Link>
      </S.LogoContainer>
      <S.ActionButtons>
        <S.Button onClick={handleExit}>Sair</S.Button>
        {showDoubtsButton && <S.Button onClick={handleHelp}>Dúvidas?</S.Button>}
      </S.ActionButtons>
    </S.HeaderNavContainer>
  )
}
