import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

export const ModalContent = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background_standard};

  border-radius: 8px;
  width: calc(100% - 2rem);
  max-width: 600px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: calc(100% - 2rem);
`

export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_standard};
  position: sticky;
  top: 0;
  padding: 1rem 1rem 0;
  z-index: 1;
`
export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary_medium};
  cursor: pointer;
  transition: color ${({ theme }) => theme.common.transition.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary_light};
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem 1rem;
`

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.common.font.sizes.heading.xsmall};
  text-align: center;
  color: ${({ theme }) => theme.colors.text_medium};
  margin: 0;
`

export const ModalSubtitle = styled.p`
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  text-align: center;
  color: ${({ theme }) => theme.colors.text_medium};
  margin: 0;
`

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-direction: column;

  @media (${device.md}) {
    flex-direction: row-reverse;
  }
`
