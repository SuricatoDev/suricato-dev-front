import styled from 'styled-components'

export const Wrapper = styled.p`
  font-size: ${(props) => props.theme.common.font.sizes.body.large};
  color: ${(props) => props.theme.colors.text_standard};
  font-weight: 600;
  margin-bottom: 1rem;
`
