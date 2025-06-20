import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Container = styled.div`
  padding: 1rem 1.5rem;
  max-width: 630px;
  margin: 0 auto;
  @media (${device.md}) {
    min-height: calc(100dvh - 162px);
    display: flex;
    align-items: center;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

export const Label = styled.span`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text_standard};
  font-weight: 500;
`

export const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const CounterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 50%;
  font-size: 24px;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text_standard};

  &:focus {
    border-color: ${({ theme }) => theme.colors.text_standard};
  }
`

export const CounterInput = styled.input`
  width: 60px;
  text-align: center;
  font-size: 18px;
  padding: 4px;
  border: none;
  border-bottom: 1px solid #ddd;
  color: ${({ theme }) => theme.colors.text_medium};
  background-color: transparent;
  text-align: center;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text_standard};
  }
`

export const DateTimeInput = styled.input.attrs({ type: 'datetime-local' })`
  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: none;
  text-align: center;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  padding: 4px;
  width: 200px;
  color: ${({ theme }) => theme.colors.text_medium};
  background-color: transparent;
  color-scheme: ${({ theme }) => (theme.title === 'dark' ? 'dark' : 'light')};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text_standard};
  }

  &::-webkit-datetime-edit {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text_medium};
  }
`

export const InputsContainer = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
`
