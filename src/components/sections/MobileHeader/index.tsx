import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft'

import * as S from './styles'

interface MobileHeaderProps {
  children?: React.ReactNode
}

export default function MobileHeader({ children }: MobileHeaderProps) {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    setCanGoBack(window.history.length > 2)
  }, [])

  const handleBack = () => {
    if (canGoBack) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <S.Wrapper>
      <S.BackButton onClick={handleBack}>
        <CaretLeft size={32} />
      </S.BackButton>
      {children}
    </S.Wrapper>
  )
}
