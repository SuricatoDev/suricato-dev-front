import styled, { DefaultTheme, css } from 'styled-components'
import { TjProps } from '.'

export type WrapperProps = Pick<TjProps, 'contrast' | 'align' | 'size'>

const wrapperModifiers = {
  contrast: (theme: DefaultTheme) => css`
    color: ${theme.colors.primary.white};
  `,
  align: (align: string) => css`
    text-align: ${align};
    padding: ${align !== 'center' ? '1em 0' : '1em'};
  `,
  auto: () => css`
    font-size: inherit;
  `,
  md: (theme: DefaultTheme) => css`
    font-size: ${theme.common.font.sizes.body.medium};
  `,
  lg: (theme: DefaultTheme) => css`
    font-size: ${theme.common.font.sizes.body.xlarge};
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, contrast, align, size }) => css`
    color: ${theme.colors.primary.text};
    font-weight: ${theme.common.font.weight.bold};
    font-size: ${theme.common.font.sizes.body.medium};
    text-align: center;
    line-height: 1.5;
    letter-spacing: -0.2px;
    ${!!contrast && wrapperModifiers.contrast(theme)};
    ${!!align && wrapperModifiers.align(align)};
    ${!!size && wrapperModifiers[size](theme)};
  `}
`
