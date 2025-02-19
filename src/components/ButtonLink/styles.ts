import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonLinkProps } from '.'
import { device } from '../../styles/breakpoints'

export type WrapperProps = Pick<
  ButtonLinkProps,
  | 'contrast'
  | 'full_width'
  | 'disabled'
  | 'variant'
  | 'color'
  | 'size'
  | 'size_desktop'
  | 'full_width_only_mobile'
  | 'uppercase'
>

const wrapperModifiers = {
  fullWidthOnlyMobile: () => css`
    width: 100%;
    @media ${device.md} {
      width: auto;
    }
  `,
  fullWidth: () => css`
    width: 100%;
  `,

  sm: (theme: DefaultTheme) => css`
    height: 1.875rem;
    padding: 0.625rem 0.75rem;
    font-size: ${theme.common.font.sizes.body.xxsmall};
  `,

  md: (theme: DefaultTheme) => css`
    height: 2.5rem;
    font-size: ${theme.common.font.sizes.body.medium};
    padding: 0.8125rem 1.5rem;
  `,

  size_desktop: (size_desktop: 'sm' | 'md', theme: DefaultTheme) => css`
    @media ${device.md} {
      ${size_desktop === 'sm' ? wrapperModifiers.sm(theme) : ''}
      ${size_desktop === 'md' ? wrapperModifiers.md(theme) : ''}
    }
  `,

  primary: (theme: DefaultTheme, disabled?: boolean, contrast?: boolean) => {
    let backgroundColor
    let color
    let hoverBackgroundColor
    let hoverColor
    let opacity
    let hoverBorder
    if (contrast) {
      backgroundColor = theme.colors.primary.white
      hoverBackgroundColor = disabled
        ? theme.colors.primary.white
        : 'transparent'
      color = theme.colors.primary.orange
      hoverBorder = theme.colors.primary.white
      opacity = disabled ? 0.4 : 1
      hoverColor = disabled
        ? theme.colors.primary.orange
        : theme.colors.primary.white
    } else {
      backgroundColor = disabled
        ? theme.colors.primary.pink_light
        : theme.colors.primary.default
      hoverBackgroundColor = disabled
        ? theme.colors.primary.pink_light
        : theme.colors.primary.orange_dark
      color = theme.colors.primary.white
      hoverBorder = 'transparent'
      opacity = 1
      hoverColor = theme.colors.primary.white
    }

    return css`
      background-color: ${backgroundColor};
      border: 1px solid transparent;
      color: ${color};
      opacity: ${opacity};

      &:hover {
        background-color: ${hoverBackgroundColor};
        border: 1px solid ${hoverBorder};
        color: ${hoverColor};
      }
    `
  },

  secondary: (theme: DefaultTheme, disabled?: boolean, contrast?: boolean) => {
    let color
    let border
    let hoverBackgroundColor
    let hoverColor
    let hoverBorder
    if (contrast) {
      hoverBackgroundColor = disabled
        ? theme.colors.secondary.white
        : 'transparent'
      color = theme.colors.secondary.white
      border = theme.colors.secondary.white
      hoverColor = theme.colors.secondary.white
      hoverBackgroundColor = disabled
        ? 'transparent'
        : theme.colors.secondary.orange_dark
      hoverBorder = disabled
        ? theme.colors.secondary.white
        : theme.colors.secondary.orange_dark
    } else {
      color = disabled
        ? theme.colors.secondary.pink_light
        : theme.colors.secondary.orange
      hoverBackgroundColor = disabled
        ? 'transparent'
        : theme.colors.secondary.orange_dark
      hoverColor = disabled
        ? theme.colors.secondary.pink_light
        : theme.colors.secondary.white
      border = disabled
        ? theme.colors.secondary.pink_light
        : theme.colors.secondary.orange
      hoverBorder = disabled
        ? theme.colors.secondary.pink_light
        : theme.colors.secondary.orange_dark
    }

    return css`
      background-color: transparent;
      color: ${color};
      opacity: ${disabled && contrast ? 0.5 : 1};
      border: 1px solid ${border};

      &:hover {
        background-color: ${hoverBackgroundColor};
        color: ${hoverColor};
        border: 1px solid ${hoverBorder};
      }
    `
  }
}

export const Wrapper = styled.a<WrapperProps>`
  ${({
    theme,
    contrast,
    full_width,
    disabled,
    variant,
    size,
    size_desktop,
    full_width_only_mobile,
    uppercase
  }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: normal;
    height: 1.875rem;
    padding: 0.625rem 0.75rem;
    white-space: nowrap;
    border-radius: 48px;
    text-decoration: none;
    cursor: ${!disabled ? 'pointer' : 'not-allowed'};
    font-weight: ${theme.common.font.weight.bold};
    transition:
      background-color ${theme.common.transition.default},
      color ${theme.common.transition.default},
      border ${theme.common.transition.default};

    span {
      line-height: 1;
    }

    ${!!full_width_only_mobile && wrapperModifiers.fullWidthOnlyMobile()};
    ${!!full_width && wrapperModifiers.fullWidth()};
    ${!!variant && wrapperModifiers[variant](theme, disabled, contrast)};
    ${!!size && wrapperModifiers[size](theme)};
    ${!!size_desktop && wrapperModifiers.size_desktop(size_desktop, theme)}
    ${uppercase && 'text-transform: uppercase'};
  `}
`
