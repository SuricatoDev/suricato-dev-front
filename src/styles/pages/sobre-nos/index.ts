import { motion } from 'framer-motion'
import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background_standard};
  overflow-x: hidden;
`

export const HeroSection = styled(motion.section)`
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 6rem 1rem calc(6rem + 24px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.background_standard};
  overflow: hidden;

  @media (${device.md}) {
    padding: calc(8rem + 100px) 1rem calc(8rem + 24px);
  }
`

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  h1 {
    max-width: 600px;
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text_ultralight};
  }

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.text_ultralight};
    font-weight: 500;
    text-align: center;
  }

  @media (${device.md}) {
    h1 {
      font-size: 3rem;
    }
  }
`

export const Main = styled.main`
  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1rem 2rem;
    @media ${device.md} {
      padding: 0 1rem calc(52px + 4rem);
    }
  }
`

export const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  @media ${device.md} {
    gap: 4rem;
    margin-top: 4rem;
  }
`

interface SectionProps {
  $alternate?: boolean
}

export const Section = styled.section<SectionProps>`
  background: ${({ $alternate, theme }) =>
    $alternate
      ? theme.title === 'dark'
        ? theme.colors.base_dark8
        : theme.colors.text_ultrafoggy
      : 'transparent'};

  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  border: 1px solid
    ${({ $alternate, theme }) =>
      $alternate
        ? theme.title === 'dark'
          ? theme.colors.text_ultrafoggy
          : 'transparent'
        : theme.colors.text_ultrafoggy};
  svg {
    color: ${({ theme }) => theme.colors.primary_medium};
    min-width: 48px;
    min-height: 48px;
  }

  @media (${device.md}) {
    gap: 3rem;
    padding: 2rem;
  }
`

export const IconWrapper = styled.div`
  flex-shrink: 0;
`

export const TextBlock = styled.div`
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text_standard};
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text_foggy};
    line-height: 1.6;
  }
`

export const ClosingBlock = styled.div`
  background: ${({ theme }) => theme.colors.primary_medium};
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  margin-top: 2rem;

  h2 {
    font-size: 2rem;
    color: ${({ theme }) =>
      theme.title === 'dark'
        ? theme.colors.base_dark8
        : theme.colors.text_ultralight};
  }

  p {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: ${({ theme }) =>
      theme.title === 'dark'
        ? theme.colors.base_dark16
        : theme.colors.text_ultrafoggy};
  }

  @media ${device.md} {
    margin-top: 4rem;
  }
`

export const WaveDivider = styled.div`
  mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA1NCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTU0IDEzLjIzNTJWMjMuOTk5OUgwVjEzLjIzODVDNS4wOTgyOSAxMy4yNzM3IDEwLjIwOTYgMTEuMDY3NyAxMy42OCA2LjYyMDVDMjAuNTY2NCAtMi4yMDQwNyAzMy45MTM2IC0yLjIwNDA3IDQwLjggNi42MjA1QzQ0LjE2MTUgMTAuOTI4MSA0OS4wNjI1IDEzLjEzMyA1NCAxMy4yMzUyWiIgZmlsbD0iYmxhY2siLz48L3N2Zz4=);
  mask-repeat: repeat-x;
  content: '';
  height: 24px;
  width: 100%;
  display: block;
  z-index: -1;
  background: ${({ theme }) => theme.colors.background_standard};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
`
