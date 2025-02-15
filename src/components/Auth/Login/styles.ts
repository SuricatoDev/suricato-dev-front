import styled from 'styled-components/native';

export const PasswordField = styled.View`
  position: relative;
  width: 100%;
  height: 46px;
  margin-bottom: 16px;
`;

export const EyeButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  padding: 0 16px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ForgotPassword = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  margin-top: 12px;
`;

export const Wrapper = styled.View`
  gap: 16px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.primary};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  text-decoration: underline;
`;
