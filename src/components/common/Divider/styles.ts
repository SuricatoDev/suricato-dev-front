import styled from 'styled-components'

import { DividerProps } from '.'

export const Divider = styled.div<DividerProps>`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.text_medium};
  font-size: 0.75rem;
  margin-top: ${({ $marginY }) => $marginY || '0'};
  margin-bottom: ${({ $marginY }) => $marginY || '0'};

  &::before {
    margin: ${({ children }) => (children ? '0 8px 0 0' : '0')};
  }

  &::after {
    margin: ${({ children }) => (children ? '0 0 0 8px' : '0')};
  }

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.base_dark16};
  }
`
