import React, { useEffect, useState } from 'react'

import { X } from '@phosphor-icons/react/dist/ssr/X'

import useIsMobile from '@/hooks/useIsMobile'

import * as S from './styles'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

function setCookie(name: string, value: string, days: number) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  document.cookie = `${name}=${value}; ${expires}; path=/`
}

function getCookie(name: string): string {
  const cname = name + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length)
    }
  }
  return ''
}

export default function PWAInstallPrompt() {
  const isMobile = useIsMobile()
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState<boolean>(false)

  useEffect(() => {
    if (getCookie('pwaPromptDismissed') === 'true') return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }
    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    await deferredPrompt.userChoice

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleCloseClick = () => {
    setShowPrompt(false)
    setDeferredPrompt(null)

    setCookie('pwaPromptDismissed', 'true', 1)
  }

  if (!showPrompt || !isMobile) {
    return null
  }

  return (
    <S.PromptContainer>
      <S.Header>
        <S.SiteInfo>
          <S.AppIcon src="/icons/icon-192x192.png" alt="App Icon" />
          <S.TextContainer>
            <S.AppName>Excursionistas</S.AppName>
            <S.AppDomain>excursionistas.com.br</S.AppDomain>
          </S.TextContainer>
        </S.SiteInfo>
        <S.CloseButton onClick={handleCloseClick}>
          <X weight="bold" size={24} />
        </S.CloseButton>
      </S.Header>
      <S.Body>
        <S.InstallButton onClick={handleInstallClick}>Instalar</S.InstallButton>
      </S.Body>
    </S.PromptContainer>
  )
}
