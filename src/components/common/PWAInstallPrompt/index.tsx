import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { X } from '@phosphor-icons/react/dist/ssr/X'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState<boolean>(false)

  useEffect(() => {
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
    const { outcome } = await deferredPrompt.userChoice
    console.log('User response to the install prompt:', outcome)
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleCloseClick = () => {
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showPrompt) return null

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
