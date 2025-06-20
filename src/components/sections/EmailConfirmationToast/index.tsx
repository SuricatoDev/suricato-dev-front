import { useEffect, useRef, useState } from 'react'

import { getCookie, setCookie } from 'cookies-next'
import { useSession } from 'next-auth/react'

import { X } from '@phosphor-icons/react/dist/ssr/X'

import * as S from './styles'

export default function EmailConfirmationToast() {
  const { status, update } = useSession()
  const [isVisible, setIsVisible] = useState(false)
  const hasCheckedRef = useRef(false)

  useEffect(() => {
    if (status !== 'authenticated' || hasCheckedRef.current) {
      return
    }

    hasCheckedRef.current = true
    ;(async () => {
      const updated = await update()

      if (
        updated?.user &&
        !updated.user.verificado &&
        !getCookie('hideEmailConfirmationToast')
      ) {
        setIsVisible(true)
      }
    })()
  }, [status])

  const handleClose = () => {
    setIsVisible(false)
    setCookie('hideEmailConfirmationToast', 'true', {
      maxAge: 60 * 60 * 24
    })
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
