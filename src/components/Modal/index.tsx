import { useEffect, useState } from 'react'
import { X } from '@phosphor-icons/react'

import * as S from './styles'
import Portal from '../common/Portal'

export type ModalProps = {
  children: React.ReactNode
  $isOpen: boolean
}

export default function Modal({ children, $isOpen }: ModalProps) {
  const [isOpen, setIsOpen] = useState($isOpen)

  useEffect(() => {
    if ($isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Portal>
      <S.Shadow $isOpen={isOpen} onClick={handleClose}>
        <S.Modal>
          <X onClick={handleClose} size={32} weight="bold" />
          {children}
        </S.Modal>
      </S.Shadow>
    </Portal>
  )
}
