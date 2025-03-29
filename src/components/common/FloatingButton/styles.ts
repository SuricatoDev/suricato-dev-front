import { device } from '@/styles/breakpoints'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 170, 142, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 165, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
  }
`

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 1rem;
  background-color: ${({ theme }) => theme.colors.primary_medium};
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  z-index: 99999;
  animation: ${pulse} 2s infinite;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_standard};
  }

  @media (${device.md}) {
    right: 40px;
  }
`
