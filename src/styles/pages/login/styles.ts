import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  @media (${device.md}) {
    padding: 40px;
  }
`
