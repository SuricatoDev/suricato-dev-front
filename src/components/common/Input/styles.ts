import styled, { keyframes } from 'styled-components'

export interface WrapperProps {
  $borderRadiusBottom?: string
  $borderRadiusTop?: string
  $borderTop?: string
  $borderBottom?: string
  $hasError?: boolean
  $error?: string
  $largePaddingRight?: boolean
}

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const Wrapper = styled.input<WrapperProps & { disabled?: boolean }>`
  width: 100%;
  padding: ${(props) =>
    props.$largePaddingRight ? '16px 60px 6px 12px' : '16px 12px 6px'};

  font-size: ${(props) => props.theme.common.font.sizes.body.large};
  background: transparent;
  color: ${(props) => props.theme.colors.text_medium};
  border: 1px solid
    ${(props) => (props.$hasError ? 'red' : props.theme.colors.text_light)};
  border-top-left-radius: ${(props) => props.$borderRadiusTop || '8px'};
  border-top-right-radius: ${(props) => props.$borderRadiusTop || '8px'};
  border-bottom-right-radius: ${(props) => props.$borderRadiusBottom || '8px'};
  border-bottom-left-radius: ${(props) => props.$borderRadiusBottom || '8px'};
  border-top: ${(props) =>
    props.$borderTop ||
    `1px solid ${props.$hasError ? 'red' : props.theme.colors.text_light}`};
  border-bottom: ${(props) =>
    props.$borderBottom ||
    `1px solid ${props.$hasError ? 'red' : props.theme.colors.text_light}`};
  min-height: 56px;
  box-sizing: border-box;
  font-family: inherit;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus {
    border: 2px solid ${(props) => props.theme.colors.text_standard};
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
