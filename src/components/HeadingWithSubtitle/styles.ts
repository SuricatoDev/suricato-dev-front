import styled from 'styled-components/native';

export const Container = styled.View``;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
