import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  gap: 2rem;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;

  h1 {
    font-size: clamp(2rem, 4vw, 3.9rem);
    color: ${({ theme }) => theme.colors.text_medium};
  }
`
export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-width: 700px;

  img {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 8px;

    @media ${device.md} {
      max-width: 80%;
    }
  }
`

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: -4px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ButtonWrapper = styled.div`
  max-width: 700px;
  width: 100%;
`
