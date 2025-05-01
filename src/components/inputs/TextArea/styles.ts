import styled from 'styled-components'

export interface WrapperProps {
  borderRadiusBottom?: string
  borderRadiusTop?: string
  borderTop?: string
  borderBottom?: string
  hasError?: boolean
}

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const Wrapper = styled.textarea<WrapperProps & { disabled?: boolean }>`
  width: 100%;
  padding: 20px 12px 6px;

  font-size: ${(props) => props.theme.common.font.sizes.body.large};
  background: transparent;
  color: ${(props) => props.theme.colors.text_medium};
  border: 1px solid
    ${(props) =>
      props.hasError
        ? props.theme.colors.alert_error
        : props.theme.colors.text_light};
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
  min-height: 120px;
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:focus {
    border-color: transparent;
    outline: 2px solid
      ${({ theme, hasError }) =>
        hasError ? theme.colors.alert_error : theme.colors.text_standard};
  }
`

export const FloatingLabel = styled.label<{ $isFloating: boolean }>`
  position: absolute;
  left: 12px;
  top: ${({ $isFloating }) => ($isFloating ? '4px' : '16px')};
  transform: ${({ $isFloating }) =>
    $isFloating ? 'translateY(0)' : 'translateY(0)'};
  font-size: ${({ $isFloating, theme }) =>
    $isFloating
      ? theme.common.font.sizes.body.xsmall
      : theme.common.font.sizes.body.large};
  color: ${({ theme, $isFloating }) =>
    $isFloating ? theme.colors.text_medium : theme.colors.text_light};
  pointer-events: none;
  transition: all 0.15s ease-in-out;
`
