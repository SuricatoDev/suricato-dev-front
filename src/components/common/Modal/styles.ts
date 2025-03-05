import styled from 'styled-components'
import { ModalProps } from '.'

export const Shadow = styled.div<Pick<ModalProps, '$isOpen'>>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
`

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  cursor: default;
  z-index: 99999;
`

export const CloseButton = styled.div<Pick<ModalProps, '$variant'>>`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  padding: 0.5rem;
  z-index: 1;
  cursor: pointer;
  color: ${({ theme, $variant }) =>
    $variant === 'light'
      ? theme.colors.base_dark32
      : theme.colors.primary_medium};

  transition:
    transform ${(props) => props.theme.common.transition.fast},
    color ${(props) => props.theme.common.transition.fast};

  &:hover {
    color: ${({ theme, $variant }) =>
      $variant === 'light' && theme.colors.primary_medium};
    transform: scale(1.1);
  }
`
