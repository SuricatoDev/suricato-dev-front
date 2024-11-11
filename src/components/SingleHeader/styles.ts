import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const IconContainer = styled.View`
  position: absolute;
  left: -10px;
`;
