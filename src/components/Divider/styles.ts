import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LineOne = styled.View`
  height: 1px;
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100 || '#EDF1F3'};
  margin: 0 8px 0 0;
`;

export const LineTwo = styled.View`
  height: 1px;
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100 || '#EDF1F3'};
  margin: 0 0 0 8px;
`;

export const TextDivider = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_300 || '#6C7278'};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;
