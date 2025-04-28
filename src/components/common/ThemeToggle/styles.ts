import styled from 'styled-components'

export const IconSun = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: #ffbc4a !important;
  }
`

export const IconMoon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${({ theme }) => theme.colors.text_foggy} !important;
  }
`
