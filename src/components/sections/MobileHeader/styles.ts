import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  z-index: 999;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  background-color: ${({ theme }) => theme.colors.background_standard};
  color: ${({ theme }) => theme.colors.text_standard};
  min-height: 64px;

  @media (${device.md}) {
    display: none;
  }

  font-size: 1rem;
  font-weight: 500;
`

export const BackButton = styled.button`
  position: absolute;
  left: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text_standard};
  cursor: pointer;
  display: flex;
`
