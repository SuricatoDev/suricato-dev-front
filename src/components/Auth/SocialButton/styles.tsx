import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.background};
  padding: 12px 16px;
  border-radius: 8px;
  flex: 1;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.COLORS.base_dark8};
`;

export const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.text_standard};
`;
