import styled, { css, keyframes } from 'styled-components'

import { device } from '@/styles/breakpoints'

export type ButtonVariantType = 'ghost' | 'outlined' | 'contained' | 'danger'

export interface ButtonProps {
  $fullWidth: boolean
  $variant: ButtonVariantType
  $loading?: boolean
  $rounded?: boolean
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid ${({ theme }) => theme.colors.text_ultralight};
  border-top-color: ${({ theme }) => theme.colors.base_dark88};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  position: absolute;
`

const baseStyles = css<ButtonProps>`
  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  justify-content: center;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  line-height: 1.5;
  font-weight: 600;
  align-items: center;
  border-radius: 8px;
  padding-left: 24px;
  padding-right: 24px;
  text-decoration: none;
  cursor: pointer;
  opacity: ${({ $loading }) => ($loading ? 0.6 : 1)};
  pointer-events: ${({ $loading }) => ($loading ? 'none' : 'auto')};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text_standard};
  }

  &:active {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Content = styled.span`
  padding-top: 12px;
  padding-bottom: 12px;
  margin: 1px 0;
  flex: 1;
  text-align: center;
  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6 {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    margin: inherit;
    color: inherit;
  }
`

const ButtonGhost = css<ButtonProps>`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text_medium};
  border: 1px solid transparent;
  transition: background-color ${({ theme }) => theme.common.transition.default};
  @media (${device.md}) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.text_light};
    }
  }
`

const ButtonOutlined = css<ButtonProps>`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text_standard};
  border: 1px solid ${({ theme }) => theme.colors.text_standard};
  transition: background-color ${({ theme }) => theme.common.transition.default};
  @media (${device.md}) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.base_dark8};
    }
  }
`

const ButtonContained = css<ButtonProps>`
  color: ${({ theme }) => theme.colors.text_ultralight};
  background-color: ${({ theme }) => theme.colors.primary_medium};
  border: 1px solid ${({ theme }) => theme.colors.primary_medium};
  transition:
    background-color ${({ theme }) => theme.common.transition.default},
    border ${({ theme }) => theme.common.transition.default};
  @media (${device.md}) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary_light};
      border: 1px solid ${({ theme }) => theme.colors.primary_light};
    }
  }
`

const ButtonDanger = css<ButtonProps>`
  color: ${({ theme }) => theme.colors.text_ultralight};
  background-color: ${({ theme }) => theme.colors.alert_error};
  border: 1px solid ${({ theme }) => theme.colors.alert_error};
  transition: opacity ${({ theme }) => theme.common.transition.default};
  @media (${device.md}) {
    &:hover:not(:disabled) {
      opacity: 0.8;
    }
  }
`

export const Button = styled.a<ButtonProps & { $loading?: boolean }>`
  position: relative;
  font-family: inherit;
  ${baseStyles}
  ${({ $variant }) => {
    switch ($variant) {
      case 'ghost':
        return ButtonGhost
      case 'outlined':
        return ButtonOutlined
      case 'danger':
        return ButtonDanger
      case 'contained':
      default:
        return ButtonContained
    }
  }}

  border-radius: ${({ $rounded }) => ($rounded ? '24px' : '8px')};

  .content {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 8px;
    align-items: center;
    visibility: ${({ $loading }) => ($loading ? 'hidden' : 'visible')};
  }
`
