import styled from 'styled-components'
import background from '@/assets/img/background.png'
import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  background-color: gray;
`
export const Hero = styled.div`
  background:
    linear-gradient(rgba(10, 12, 44, 0.5) 3rem, transparent) center center /
      cover,
    url(${background.src}) left center / cover;
  align-items: flex-start;
  padding-top: 7.5rem;
  height: 100vh;
  max-height: 720px;
  padding: 15rem 0 6rem;
`

export const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.background_standard};
  padding-top: 138px;
  @media (${device.md}) {
    padding-top: 180px;
  }
`
