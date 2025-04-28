import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  z-index: 999;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.base_dark32 : 'transparent'};
  background-color: ${({ theme }) => theme.colors.background_light};
  color: ${({ theme }) => theme.colors.text_standard};
  min-height: 64px;

  @media (${device.md}) {
    display: none;
  }

  font-size: 1rem;
  font-weight: 500;
`

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text_standard};
  cursor: pointer;
  display: flex;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
`
