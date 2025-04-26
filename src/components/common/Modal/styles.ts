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

export const Modal = styled.div<Pick<ModalProps, '$withMaxSizes'>>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.background_standard};

  height: auto;
  width: ${({ $withMaxSizes }) =>
    $withMaxSizes ? 'calc(100% - 2rem);' : '100%'};
  max-width: ${({ $withMaxSizes }) =>
    $withMaxSizes ? '400px' : 'calc(100% - 2rem);'};
  max-height: calc(100% - 2rem);
  border-radius: 8px;
  overflow-y: auto;
  z-index: 99999;
  cursor: default;
`

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;

  .modal-close-btn {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary_medium};
    transition: opacity ${(props) => props.theme.common.transition.default};

    &:hover {
      opacity: 0.8;
    }
  }
`
