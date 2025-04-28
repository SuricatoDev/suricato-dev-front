import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft'

import ThemeToggle from '@/components/common/ThemeToggle'

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

  const handleBack = async () => {
    if (canGoBack) {
      const previousPath = document.referrer

      if (!previousPath || previousPath.includes(window.location.origin)) {
        router.push('/')
      } else {
        router.back()
      }
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
      <ThemeToggle />
    </S.Wrapper>
  )
}
