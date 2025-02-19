import styled from 'styled-components'

export const Wrapper = styled.footer`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.primary.bg_contrast};
  transition: background-color
    ${(props) => props.theme.common.transition.default};
  flex-wrap: wrap;
  padding: 60px 1rem;

  p {
    font-size: ${(props) => props.theme.common.font.sizes.body.medium};
    color: ${(props) => props.theme.colors.primary.white};
    font-weight: ${(props) => props.theme.common.font.weight.semibold};
    transition: color ${(proprs) => proprs.theme.common.transition.default};
    text-align: center;
    line-height: 1.7;
  }
`
