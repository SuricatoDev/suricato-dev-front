import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.background_standard};
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  justify-content: center;
  @media (${device.md}) {
    display: none;
  }
`

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`

export const NavItem = styled.div<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;

  svg {
    fill: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary_medium : theme.colors.base_dark56};
  }
`

export const NavLabel = styled.span<{ $isActive: boolean }>`
  font-size: 0.675rem;
  margin-top: 4px;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary_medium : theme.colors.base_dark56};
`
