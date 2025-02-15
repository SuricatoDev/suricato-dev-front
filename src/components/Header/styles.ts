import styled from 'styled-components/native';

export const Header = styled.View`
  gap: 16px;
  margin-top: 24px;
  padding: 24px 24px 52px 24px;
  min-height: 220px;
  height: auto;
`;

export const Logo = styled.Image`
  width: 45px;
  height: 45px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.COLORS.white};
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.COLORS.white};
`;
