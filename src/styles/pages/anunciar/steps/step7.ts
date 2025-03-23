import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 1.5rem;
  max-width: 630px;
  margin: 0 auto;
  @media (${device.md}) {
    height: calc(100dvh - 88px - 86px);
    display: flex;
    align-items: center;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text_standard};
  font-size: 1.625rem;
  font-weight: 500;

  @media (${device.md}) {
    font-size: 2rem;
  }
`

export const Description = styled.p`
  ${({ theme }) => theme.colors.text_standard};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text_medium};
  line-height: 1.3;
`
