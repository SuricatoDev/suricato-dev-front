import styled, { css } from 'styled-components'
import { WaveDividerProps } from '.'
import { device } from '@/styles/breakpoints'

export type WrapperProps = Pick<WaveDividerProps, 'background'>

const wrapperModifiers = {
  background: (background: string) => css`
    background-color: ${background};
    transition: all ${(props) => props.theme.common.transition.default};
  `
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  display: flex;

  .divider {
    margin-top: -1px;
    margin-bottom: -1px;
    width: 100%;
    path {
      transition: all ${(props) => props.theme.common.transition.default};
    }

    &-desktop {
      display: none;
    }

    @media ${device.md} {
      &-desktop {
        display: block;
      }
      &-mobile {
        display: none;
      }
    }
  }

  ${({ background }) => css`
    ${!!background && wrapperModifiers.background(background)}
  `}
`
