import React from 'react'

import logo from '@/assets/images/logo.png'
import Link from 'next/link'
import { useRouter } from 'next/router'

import * as S from './styles'

interface HeaderNavProps {
  showDoubtsButton?: boolean
}

export default function HeaderNav({ showDoubtsButton = true }: HeaderNavProps) {
  const router = useRouter()

  const handleExit = () => {
    router.push('/anuncios')
  }

  const handleHelp = () => {
    router.push('/central-de-ajuda')
  }

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
