import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  display: flex;
  @media (${device.md}) {
    padding: 40px;
  }
`
