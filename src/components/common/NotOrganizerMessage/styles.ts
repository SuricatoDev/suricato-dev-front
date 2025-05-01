import Image from 'next/image'
import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  max-width: 700px;
  margin: 0 auto;

  img {
    max-width: 50%;
    max-height: 50%;
    height: auto;
    width: 100%;
    border-radius: 8px;
    margin: 0 auto;
  }
`

export const Title = styled.h1`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text_standard};
  font-size: ${({ theme }) => theme.common.font.sizes.heading.large};
  font-weight: 600;
  letter-spacing: -0.04rem;
  line-height: 2.25rem;
  text-align: center;

  @media (${device.md}) {
    font-size: 3rem;
    line-height: 3.375rem;
  }
`

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.text_medium};
  line-height: 1.5rem;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  font-weight: 500;

  @media (${device.md}) {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`

export const ImageContainer = styled(Image)`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`
