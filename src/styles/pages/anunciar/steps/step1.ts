import { device } from '@/styles/breakpoints'
import Image from 'next/image'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 1.5rem;
  height: calc(100dvh - 88px - 100px);
  box-sizing: border-box;
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (${device.md}) {
    flex-direction: row-reverse;
    align-items: center;
    gap: 3rem;
    justify-content: center;
  }
`

export const StepNumber = styled.h2`
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_standard};
  margin-bottom: 8px;

  @media (${device.md}) {
    font-size: 1.375rem;
    line-height: 1.625rem;
    margin-bottom: 16px;
  }
`

export const Title = styled.h1`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text_standard};
  font-size: ${({ theme }) => theme.common.font.sizes.heading.large};
  font-weight: 500;
  letter-spacing: -0.04rem;
  line-height: 2.25rem;

  @media (${device.md}) {
    font-size: 3rem;
    line-height: 3.375rem;
  }
`

export const Instructions = styled.p`
  color: ${({ theme }) => theme.colors.text_medium};
  line-height: 1.5rem;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};

  @media (${device.md}) {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`

export const StepImg = styled(Image)`
  margin: 0 auto;
  width: calc(100% - 4rem);
  max-width: 650px;
  height: auto;
  filter: drop-shadow(8px 12px 6px rgba(0, 0, 0, 0.3));

  @media (${device.md}) {
    margin: unset;
    width: 50%;
    flex: 1;
  }
`

export const StepInfo = styled.div`
  @media (${device.md}) {
    flex: 2;
    width: calc(50vw - 48px);
    max-width: 575px;
  }
`
