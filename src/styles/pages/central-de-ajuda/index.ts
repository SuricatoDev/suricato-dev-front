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
  @media (${device.md}) {
    padding: 0 0 52px 0;
  }
`

export const SpacingMobile = styled.div`
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (${device.md}) {
    padding: 0;
  }
`

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
  gap: 0.5rem;
`

export const Title = styled.h1`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.text_standard};
  text-align: center;

  @media (${device.md}) {
    font-size: 2rem;
  }
`

export const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.common.font.sizes.heading.xxxsmall};
  color: ${({ theme }) => theme.colors.text_standard};
  font-weight: 500;
  text-align: center;

  @media (${device.md}) {
    font-size: 1.125rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary_medium};
    text-decoration: underline;
    font-weight: 600;
    transition: color ${({ theme }) => theme.common.transition};

    &:hover {
      color: ${({ theme }) => theme.colors.primary_light};
    }
  }
`

export const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

interface SectionProps {
  $alternate?: boolean
}

export const Section = styled.section<SectionProps>`
  background: ${({ $alternate, theme }) =>
    $alternate ? theme.colors.text_ultrafoggy : 'transparent'};
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  border: 1px solid
    ${({ $alternate, theme }) =>
      $alternate ? 'transparent' : theme.colors.text_ultrafoggy};
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
    color: ${({ theme }) => theme.colors.text_ultralight};
  }

  p {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text_ultrafoggy};
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
export const AccordionItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.text_ultrafoggy};
  padding: 0.5rem 0;
  cursor: pointer;
`

export const QuestionButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1rem 0;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text_medium};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

export const Answer = styled.div`
  padding-top: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text_foggy};
  line-height: 1.6;
`
export const ContactSection = styled.div`
  text-align: center;
  margin: 1rem 0;
`

export const ContactTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text_standard};
  margin-bottom: 1rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem 1rem;
  background-color: ${({ theme }) => theme.colors.background_light};
  border-radius: 8px;
`

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.common.font.sizes.heading.xsmall};
  text-align: center;
  color: ${({ theme }) => theme.colors.text_medium};
  margin: 0;
  padding-bottom: 0.5rem;
`
