import { useEffect } from 'react'
import { X } from '@phosphor-icons/react/dist/ssr/X'
import * as S from './styles'
import Portal from '../Portal'

export type ModalProps = {
  children: React.ReactNode
  $isOpen: boolean
  onClose: () => void
}

export default function Modal({ children, $isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if ($isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [$isOpen])

  if (!$isOpen) return null

  return (
    <Portal>
      <S.Shadow $isOpen={$isOpen} onClick={onClose}>
        <S.Modal onClick={(e) => e.stopPropagation()}>
          <S.ModalHeader>
            <X
              className="modal-close-btn"
              onClick={onClose}
              size={32}
              weight="bold"
            />
          </S.ModalHeader>
          {children}
        </S.Modal>
      </S.Shadow>
    </Portal>
  )
}
