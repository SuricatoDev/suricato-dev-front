import { useEffect } from 'react'

import { X } from '@phosphor-icons/react/dist/ssr/X'

import Portal from '../Portal'
import * as S from './styles'

export type ModalProps = {
  children: React.ReactNode
  $isOpen: boolean
  onClose: () => void
  $withMaxSizes?: boolean
  closeButton?: boolean
  style?: React.CSSProperties
}

export default function Modal({
  children,
  $isOpen,
  $withMaxSizes = true,
  onClose,
  closeButton = true,
  style
}: ModalProps) {
  useEffect(() => {
    if ($isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [$isOpen])

  if (!$isOpen) return null

  return (
    <Portal>
      <S.Shadow $isOpen={$isOpen} onClick={onClose}>
        <S.Modal
          $withMaxSizes={$withMaxSizes}
          onClick={(e) => e.stopPropagation()}
          style={style}
        >
          {closeButton && (
            <S.ModalHeader>
              <X
                className="modal-close-btn"
                onClick={onClose}
                size={32}
                weight="bold"
              />
            </S.ModalHeader>
          )}
          {children}
        </S.Modal>
      </S.Shadow>
    </Portal>
  )
}
