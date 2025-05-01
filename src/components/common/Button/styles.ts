import styled, { css, keyframes } from 'styled-components'

import { device } from '@/styles/breakpoints'

export type ButtonVariantType =
  | 'ghost'
  | 'outlined'
  | 'contained'
  | 'danger'
  | 'text'

export interface ButtonProps {
  fullWidth: boolean
  variant: ButtonVariantType
  loading?: boolean
  rounded?: boolean
  disabled?: boolean
  size?: 'sm' | 'md'
}

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  justify-content: center;
  font-size: ${({ theme, size }) =>
    size === 'sm' ? '0.875rem' : theme.common.font.sizes.body.large};
  padding: ${({ size }) => (size === 'sm' ? '0 12px' : '0 24px')};
  line-height: 1.5;
  font-weight: 600;
  align-items: center;
  border-radius: ${({ rounded, size }) =>
    rounded ? '24px' : size === 'sm' ? '4px' : '8px'};
  text-decoration: none;
  user-select: none;
  transition: all ${({ theme }) => theme.common.transition.default};
  cursor: ${({ disabled, loading }) =>
    disabled || loading ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled, loading }) => (disabled || loading ? 0.4 : 1)};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text_standard};
  }

  &:active {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    outline: none;
  }
`

export const Content = styled.span<{ size?: 'sm' | 'md' }>`
  padding: ${({ size }) => (size === 'sm' ? '6px 0' : '12px 0')};
  margin: 1px 0;

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
  border: 1px solid ${({ theme }) => theme.colors.text_ultrafoggy};

  transition: background-color ${({ theme }) => theme.common.transition.default};
  @media (${device.md}) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.text_ultrafoggy};
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

const ButtonText = css<ButtonProps>`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary_medium};
  border: 1px solid transparent;
  text-decoration: underline;
  transition: opacity ${({ theme }) => theme.common.transition.default};
  @media (${device.md}) {
    &:hover:not(:disabled) {
      opacity: 0.8;
    }
  }
`

export const Button = styled.button<ButtonProps>`
  position: relative;
  font-family: inherit;
  user-select: none;
  ${baseStyles}
  ${({ variant }) => {
    switch (variant) {
      case 'ghost':
        return ButtonGhost
      case 'outlined':
        return ButtonOutlined
      case 'danger':
        return ButtonDanger
      case 'text':
        return ButtonText
      case 'contained':
      default:
        return ButtonContained
    }
  }}
  border-radius: ${({ rounded, size }) =>
    rounded ? '24px' : size === 'sm' ? '4px' : '8px'};

  .content {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 8px;
    align-items: center;
    visibility: ${({ loading }) => (loading ? 'hidden' : 'visible')};
  }
`
