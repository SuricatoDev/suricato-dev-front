import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    color: ${({ theme }) => theme.colors.primary_dark};
  }
`
export const StarText = styled.span`
  font-size: ${({ theme }) => theme.common.font.sizes.body.xsmall};
  font-weight: 500;
`
