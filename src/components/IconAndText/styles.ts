import styled, { css } from 'styled-components'
import { IconAndTextProps } from '.'

export type IconAndTextStyleProps = Pick<
  IconAndTextProps,
  'background_color' | 'width' | 'height' | 'border_radius'
>

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-decoration: none;
  color: #1d1d1d;
  transition: opacity ${(props) => props.theme.common.transition.fast};

  &:hover {
    opacity: 0.8;
  }
`

const wrapperModifiers = {
  background_color: (
    background_color: IconAndTextStyleProps['background_color']
  ) => css`
    background-color: ${background_color};
  `,
  border_radius: (border_radius: IconAndTextStyleProps['border_radius']) => css`
    border-radius: ${border_radius};
  `,
  width: (width: IconAndTextStyleProps['width']) => css`
    width: ${width}px;
  `,
  height: (height: IconAndTextStyleProps['height']) => css`
    height: ${height}px;
  `
}

export const IconContainer = styled.div<IconAndTextStyleProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${({ background_color, border_radius, width, height }) => css`
    ${!!background_color && wrapperModifiers.background_color(background_color)}
    ${!!border_radius && wrapperModifiers.border_radius(border_radius)}
    ${!!width && wrapperModifiers.width(width)}
    ${!!height && wrapperModifiers.height(height)}
    ${!!width && !height && wrapperModifiers.height(width)}
    ${!!height && !width && wrapperModifiers.width(height)}
  `}
`

export const Text = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.common.font.sizes.body.large};
    font-weight: ${theme.common.font.weight.bold};
  `}

  line-height: normal;
  text-align: center;
`
