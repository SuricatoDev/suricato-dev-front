import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media (${device.md}) {
    flex-direction: row;
    justify-content: space-between;
    > * {
      flex: 1;
    }
  }
`
