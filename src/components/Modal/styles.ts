import styled from 'styled-components'
import { ModalProps } from './'

export const Shadow = styled.div<ModalProps>`
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

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary_medium};
    transition: opacity 2s;

    &:hover {
      opacity: 0.8;
    }
  }
`

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.background_standard};

  min-width: 300px;
  min-height: 300px;

  border-radius: 12px;
`
