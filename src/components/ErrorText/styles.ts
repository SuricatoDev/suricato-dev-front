import styled from 'styled-components/native';

export const Container = styled.Text`
  color: ${({ theme }) => theme.COLORS.RED_MID};
  font-size: 12px;
  margin-top: 4px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  flex-wrap: wrap;
`;
