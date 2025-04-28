'use client'

import { useEffect, useState } from 'react'

import { getCookie, setCookie } from 'cookies-next'
import { useSession } from 'next-auth/react'

import { X } from '@phosphor-icons/react'

import * as S from './styles'

export default function EmailConfirmationToast() {
  const { data: session } = useSession()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (
      session?.user &&
      !session.user.verificado &&
      !getCookie('hideEmailConfirmationToast')
    ) {
      setIsVisible(true)
    }
  }, [session])

  const handleClose = () => {
    setIsVisible(false)
    setCookie('hideEmailConfirmationToast', 'true', { maxAge: 60 * 60 * 24 })
  }

  if (!isVisible) {
    return null
  }

  return (
    <S.ToastContainer>
      <p>
        Confirme seu e-mail para acessar todos os recursos. <br />
        <br />
        <b>Verifique sua caixa de entrada!</b>
      </p>
      <S.CloseButton onClick={handleClose}>
        <X weight="bold" size={20} />
      </S.CloseButton>
    </S.ToastContainer>
  )
}
