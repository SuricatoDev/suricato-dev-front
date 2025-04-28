import Image from 'next/image'
import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const HeaderNavContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.background_standard};
  gap: 2px;
  flex-wrap: wrap;

  @media (${device.md}) {
    padding: 2rem 3rem 0;
  }
`

export const Button = styled.button`
  color: ${({ theme }) => theme.colors.text_standard};
  text-align: center;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: transparent;
  padding: 0 1rem;
  height: 40px;
  border-radius: 32px;
  font-weight: 500;
  display: flex;
  align-items: center;
  line-height: 1.125rem;
  font-size: ${({ theme }) => theme.common.font.sizes.body.medium};

  transition: border-color ${(props) => props.theme.common.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text_standard};
  }
`

export const Logo = styled(Image)`
  transition: opacity ${(props) => props.theme.common.transition.fast};
  filter: ${(props) =>
    props.theme.title === 'dark'
      ? 'saturate(0) brightness(0) invert(1)'
      : 'none'};

  &:hover {
    opacity: 0.8;
  }
`

export const LogoContainer = styled.div`
  display: none;

  @media (${device.md}) {
    display: block;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;

  @media (${device.md}) {
    width: unset;
    flex-direction: row-reverse;
  }
`
