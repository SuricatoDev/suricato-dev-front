import styled, { keyframes } from 'styled-components'

import { device } from '@/styles/breakpoints'

export const bounce = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(-12px); }
`

export const Dot = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 6px;
  background: ${({ theme }) => theme.colors.primary_medium};
  border-radius: 50%;
  animation: ${bounce} 0.3s ease-in-out infinite alternate;

  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
`

export const Dots = styled.div`
  display: flex;
  align-items: flex-end;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background: ${({ theme }) => theme.colors.background_standard};
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;

  @media ${device.md} {
    display: none;
  }
`
