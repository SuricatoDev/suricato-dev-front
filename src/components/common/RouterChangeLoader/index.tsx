import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useFooterVisibility } from '@/hooks/useFooterVisibility'

import * as S from './styles'

export default function RouteChangeLoader() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const footerVisible = useFooterVisibility('mobile-footer', { threshold: 0.1 })

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleEnd = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleEnd)
    router.events.on('routeChangeError', handleEnd)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleEnd)
      router.events.off('routeChangeError', handleEnd)
    }
  }, [router.events])

  if (!loading) return null

  return (
    <S.Overlay footerVisible={footerVisible}>
      <S.Dots>
        <S.Dot />
        <S.Dot />
        <S.Dot />
      </S.Dots>
    </S.Overlay>
  )
}
