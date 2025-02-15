import styled from 'styled-components/native';

export const FormContainer = styled.View`
  flex: 1;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
`;

export const TjContainer = styled.View`
  padding: 16px 0 0 0;
  align-items: center;
`;

export const TjText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.text_medium};
  text-align: center;
  line-height: 18px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const LinkText = styled.Text`
  color: ${({ theme }) => theme.COLORS.primary};
  text-decoration: underline;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
`;
