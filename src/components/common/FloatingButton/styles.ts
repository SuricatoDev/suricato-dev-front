import styled, { css, keyframes } from 'styled-components'

const parseColorToRgb = (color?: string): string => {
  const str = String(color ?? '').trim()
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return '0, 0, 0'
  ctx.fillStyle = str
  const computed = ctx.fillStyle
  if (computed.startsWith('#')) {
    let c = computed.slice(1)
    if (c.length === 3)
      c = c
        .split('')
        .map((x) => x + x)
        .join('')
    const num = parseInt(c, 16)
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`
  }
  const m = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  return m ? `${m[1]}, ${m[2]}, ${m[3]}` : '0, 0, 0'
}

export const StyledFab = styled.button<{
  size: number
  top?: number
  bottom: number
  left?: number
  right: number
  animate: boolean
  iconColor?: string
  backgroundColor?: string
  borderColor?: string
}>`
  position: fixed;
  ${({ top, bottom }) =>
    top != null ? `top:${top}px;` : `bottom:${bottom}px;`}
  ${({ left, right }) =>
    left != null ? `left:${left}px;` : `right:${right}px;`}

  width:  ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ?? theme.colors.primary_standard};
  color: ${({ iconColor, theme }) =>
    iconColor ?? theme.colors.contrast_standard};
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor}` : 'none'};

  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: ${({ theme }) => theme.common.transition.fast};

  ${({ animate, backgroundColor, theme }) =>
    animate &&
    css`
      animation: ${keyframes`
        0% { box-shadow: 0 0 0 0 rgba(${parseColorToRgb(
          backgroundColor ?? theme.colors.primary_standard
        )},0.7); }
        70%{ box-shadow: 0 0 0 10px rgba(${parseColorToRgb(
          backgroundColor ?? theme.colors.primary_standard
        )},0); }
        100%{box-shadow: 0 0 0 0 rgba(${parseColorToRgb(
          backgroundColor ?? theme.colors.primary_standard
        )},0); }
      `} 2s infinite;
    `}

  &:hover {
    background-color: ${({ backgroundColor, theme }) =>
      backgroundColor == null ? theme.colors.primary_medium : backgroundColor};
  }
`
