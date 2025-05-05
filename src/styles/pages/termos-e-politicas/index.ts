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
  padding-bottom: 2rem;
  @media (${device.md}) {
    padding-bottom: 4rem;
  }
`

export const SpacingMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
  @media (${device.md}) {
    padding: 3rem 2rem;
    gap: 3rem;
  }
`

export const TextBlock = styled.div`
  h2 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text_standard};
  }
  p {
    font-size: 1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text_foggy};
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text_medium};
  }
  ul {
    list-style: disc inside;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text_medium};
    li {
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.text_medium};
    }
  }

  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary_medium};
    font-weight: 500;
    transition: color ${({ theme }) => theme.common.transition.default};

    &:hover {
      color: ${({ theme }) => theme.colors.primary_light};
    }
  }

  b {
    color: ${({ theme }) => theme.colors.text_standard};
  }
`

export const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Section = styled.section`
  background: ${({ theme }) => theme.colors.background_light};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.text_ultrafoggy};
`

export const ContactSection = styled.div`
  display: flex;
  justify-content: center;
`
