import styled from 'styled-components'

export const Wrapper = styled.span`
  color: ${(props) => props.theme.colors.alert_error};
  font-size: ${(props) => props.theme.common.font.sizes.body.xsmall};
  margin-top: 4px;
  display: block;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`
