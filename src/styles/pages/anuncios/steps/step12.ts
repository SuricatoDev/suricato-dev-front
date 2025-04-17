import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`
export const Container = styled.div`
  padding: 1rem 1.5rem;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  height: calc(100dvh - 87px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media (${device.md}) {
    display: flex;
    padding: 0;
    align-items: center;
  }
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

export const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  padding: 1rem 0;
`

export const PriceDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 4rem;
  @media (${device.md}) {
    font-size: 5rem;
  }
`

export const PriceText = styled.span`
  letter-spacing: 0.4px;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const PriceInput = styled.input`
  font-weight: bold;
  border: none;
  outline: none;
  text-align: center;
  width: 100%;
  letter-spacing: 0.4px;
  font-size: 4rem;
  @media (${device.md}) {
    font-size: 5rem;
  }
`

export const EditButton = styled.button`
  background: ${({ theme }) => theme.colors.background_standard};
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 0.35rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`

export const GuestPriceSummary = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_standard};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (${device.md}) {
    font-size: 1.125rem;
  }
`

export const DetailsCard = styled.div<{ active?: boolean }>`
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 500px;
  cursor: ${({ active }) => (active ? 'auto' : 'pointer')};

  border: ${({ active, theme }) =>
    active ? `1px solid ${theme.colors.text_standard}` : '1px solid #ccc'};
`

export const DetailsRow = styled.div<{ bold?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text_standard};

  @media (${device.md}) {
    font-size: 1.125rem;
  }

  span {
    &:last-child {
      white-space: nowrap;
    }
  }
`

export const ToggleDetails = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.95rem;
  font-weight: 500;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text_standard};
  cursor: pointer;
`

export const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
