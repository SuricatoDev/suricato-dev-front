import Link from 'next/link'
import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const FooterWrapper = styled.footer<{ $isScrollingDown: boolean }>`
  position: fixed;
  bottom: ${({ $isScrollingDown }) => ($isScrollingDown ? '-64px' : '0')};
  transition: ${({ theme }) => theme.common.transition.fast};
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.background_light};
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
  border-top: 1px solid
    ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.base_dark32 : 'transparent'};

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

export const NavItem = styled(Link)<{ $isActive: boolean }>`
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
