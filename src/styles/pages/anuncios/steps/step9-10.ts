import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

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

export const Container = styled.div`
  padding: 1rem 1.5rem;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  @media (${device.md}) {
    height: calc(100dvh - 87px);
    display: flex;
    padding: 0;
    align-items: center;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`

export const Textarea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 1rem;
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.alert_error : theme.colors.text_foggy};
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.alert_error : theme.colors.text_standard};
  }
`

export const CharCount = styled.div`
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text_foggy};
  font-weight: bold;
  align-self: flex-start;
  font-weight: bold;
`
