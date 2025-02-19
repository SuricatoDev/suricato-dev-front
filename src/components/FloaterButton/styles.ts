import styled from 'styled-components'
import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  position: fixed;
  bottom: -150px;
  width: 100%;
  padding: 1.5rem 1rem;
  padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
  background-color: ${(props) => props.theme.colors.primary.bg};
  transition:
    background-color ${(props) => props.theme.common.transition.default},
    bottom ${(props) => props.theme.common.transition.slow};
  z-index: 5;
  box-shadow: 0px -16px 32px -6px rgba(0, 0, 0, 0.18);

  &.show,
  .show {
    bottom: 0;
  }

  @media ${device.md} {
    display: none;
  }
`
