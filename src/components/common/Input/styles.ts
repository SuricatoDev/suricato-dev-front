import styled from 'styled-components'

export interface WrapperProps {
  $borderRadiusBottom?: string
  $borderRadiusTop?: string
  $borderTop?: string
  $borderBottom?: string
  $hasError?: boolean
  $error?: string
}

export const Wrapper = styled.input<WrapperProps>`
  width: 100%;
  padding: 8px;
  font-size: ${(props) => props.theme.common.font.sizes.body.large};
  background: transparent;
  color: ${(props) => props.theme.colors.text_medium};
  position: relative;
  z-index: 2;
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
`
