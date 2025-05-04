import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Container = styled.div`
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;

  @media (${device.md}) {
    flex-direction: row-reverse;
    align-items: center;
    gap: 3rem;
    justify-content: center;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (${device.md}) {
    max-width: 640px;
    justify-content: center;
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (${device.md}) {
    gap: 16px;
  }
`

export const Title = styled.h1`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text_standard};
  font-size: 1.5rem;
  font-weight: 500;

  @media (${device.md}) {
    font-size: 2rem;
    margin-bottom: 32px;
  }
`

export const Option = styled.button`
  flex: 0 1 calc(50% - 6px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background_light};
  color: ${({ theme }) => theme.colors.text_standard};
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  border: 1px solid #ddd;
  cursor: pointer;

  transition:
    border-color ${({ theme }) => theme.common.transition.default},
    background-color ${({ theme }) => theme.common.transition.default};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary_medium};
  }

  &[data-selected='true'] {
    border-color: ${({ theme }) => theme.colors.primary_medium};
    background-color: ${({ theme }) => theme.colors.primary_medium}10;
  }

  @media (${device.md}) {
    flex: 0 1 calc(33% - 9px);
  }
`

export const OptionLabel = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25rem;
  word-break: break-word;
  text-align: center;
`
