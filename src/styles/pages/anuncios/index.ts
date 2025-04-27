import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background_standard};
`

export const Main = styled.main`
  padding-top: 2rem;
  @media (${device.md}) {
    padding: 100px 0 calc(53px + 2rem) 0;
  }
`

export const MainCenter = styled.main`
  padding: 2rem 0;
  min-height: 100vh;

  margin: auto auto;
  @media (${device.md}) {
    padding: 100px 0 calc(53px + 2rem) 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

export const SpacingMobile = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (${device.md}) {
    padding: 0;
  }
`

export const Title = styled.h1`
  display: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text_standard};
  padding: 2rem 0;

  @media (${device.md}) {
    font-size: 2rem;
    display: flex;
  }
`

export const TopActions = styled.div`
  margin: 1rem 0;
`

export const CaravanGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (${device.xsm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (${device.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;

  h3 {
    padding-bottom: 1rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text_standard};
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text_medium};
    font-weight: 500;
    line-height: 1.25;
  }
`

export const ModalButtons = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`

export const EmptyMessage = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_foggy};
  padding: 4rem 1rem;
  width: 100%;
  min-height: 60vh;

  @media ${device.md} {
    font-size: 1.5rem;
    svg {
      width: 90px;
      height: 90px;
    }
  }
`
