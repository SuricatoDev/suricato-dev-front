import styled, { css } from 'styled-components'
import { ShadowProps } from '.'

export type WrapperProps = Pick<ShadowProps, 'color' | 'opacity' | 'onClick'>

export const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  ${({ color, opacity, onClick }) => css`
    background-color: ${color};
    opacity: ${opacity};
    cursor: ${onClick ? 'pointer' : 'unset'};
  `}
`
