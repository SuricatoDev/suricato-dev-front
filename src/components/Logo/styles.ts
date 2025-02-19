import styled, { css } from 'styled-components'
import { device } from '../../styles/breakpoints'
import { LogoProps } from '.'

export type WrapperProps = Pick<LogoProps, 'size' | 'contrast'>

const wrapperModifiers = {
  sm: () => css`
    img {
      height: 30px;

      @media ${device.md} {
        height: 35px;
      }
    }
  `,

  md: () => css`
    img {
      height: 25px;
      @media ${device.md} {
        height: 35px;
      }
    }
  `,
  contrast: () => css`
    filter: saturate(0) brightness(0) invert(1);
  `
}

export const Wrapper = styled.a<WrapperProps>`
  ${({ size, contrast }: WrapperProps) => css`
    transition: opacity ${(props) => props.theme.common.transition.fast};
    &:hover {
      opacity: 0.7;
    }
    img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;

      @media ${device.md} {
        height: 35px;
      }
    }
    ${!!size && wrapperModifiers[size]()};
    ${!!contrast && wrapperModifiers.contrast()};
  `}
  img {
    transition: filter ${(props) => props.theme.common.transition.default};
    width: auto;
  }

  .dark-logo {
    filter: saturate(0) brightness(0) invert(1);
  }
`
