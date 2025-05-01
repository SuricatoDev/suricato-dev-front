import styled, { css } from 'styled-components'
import { keyframes } from 'styled-components'

export interface WrapperProps {
  borderRadiusBottom?: string
  borderRadiusTop?: string
  borderTop?: string
  borderBottom?: string
  hasError?: boolean
  error?: string
}

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const Wrapper = styled.input<
  WrapperProps & { disabled?: boolean; $hasFloatingLabel: boolean }
>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 100%;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  background-color: ${({ theme }) => theme.colors.background_light};
  color: ${({ theme }) => theme.colors.text_medium};
  border: 1px solid
    ${({ hasError, theme }) =>
      hasError ? theme.colors.alert_error : theme.colors.text_light};

  box-sizing: border-box;
  border-top-left-radius: ${(props) => props.borderRadiusTop || '8px'};
  border-top-right-radius: ${(props) => props.borderRadiusTop || '8px'};
  border-bottom-right-radius: ${(props) => props.borderRadiusBottom || '8px'};
  border-bottom-left-radius: ${(props) => props.borderRadiusBottom || '8px'};
  border-top: ${(props) =>
    props.borderTop ||
    `1px solid ${props.hasError ? props.theme.colors.alert_error : props.theme.colors.text_light}`};
  border-bottom: ${(props) =>
    props.borderBottom ||
    `1px solid ${props.hasError ? props.theme.colors.alert_error : props.theme.colors.text_light}`};

  ${({ $hasFloatingLabel }) =>
    $hasFloatingLabel
      ? css`
          padding: 16px 60px 6px 12px;
        `
      : css`
          padding: 0 60px 0 12px;
          line-height: 56px;
        `}

  min-height: 56px;

  &:focus {
    outline: 2px solid
      ${({ theme, hasError }) =>
        hasError ? theme.colors.alert_error : theme.colors.text_standard};
    border-color: transparent;
    z-index: 2;
    position: relative;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`

export const FloatingLabel = styled.label<{ $isFloating: boolean }>`
  position: absolute;
  left: 12px;
  top: ${({ $isFloating }) => ($isFloating ? '4px' : '50%')};
  transform: ${({ $isFloating }) =>
    $isFloating ? 'translateY(0)' : 'translateY(-50%)'};
  font-size: ${({ $isFloating, theme }) =>
    $isFloating
      ? theme.common.font.sizes.body.xsmall
      : theme.common.font.sizes.body.large};
  color: ${({ theme, $isFloating }) =>
    $isFloating ? theme.colors.text_medium : theme.colors.text_light};
  pointer-events: none;
  transition: all 0.15s ease-in-out;
  z-index: 2;
`

const rotate = keyframes`
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
`

export const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid ${({ theme }) => theme.colors.text_ultralight};
  border-top-color: ${({ theme }) => theme.colors.base_dark56};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  position: absolute;
  right: 11px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text_medium};
  z-index: 2;
`
