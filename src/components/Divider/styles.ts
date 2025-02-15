import styled from 'styled-components/native';
import { DividerProps } from '.';

export const Container = styled.View<Pick<DividerProps, 'marginVertical'>>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: ${({ marginVertical }) => marginVertical ?? 0}px 0;
`;

export const LineOne = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.base_dark16};
`;

export const LineTwo = styled(LineOne)`
  flex: 1;
`;

export const TextDivider = styled.Text`
  margin: 0 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.base_dark32};
  text-align: center;
  line-height: 14px;
`;
