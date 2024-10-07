import styled from 'styled-components/native';

export const FormContainer = styled.View`
  flex: 1;
  margin-top: -16px;
`;

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

export const OptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 2px 2px 2px 4px;
`;

export const RememberMeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const StyledCheckbox = styled.TouchableHighlight.attrs<{
  isActive: boolean;
}>({
  underlayColor: 'transparent',
})<{ isActive: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.COLORS.ORANGE_500 : 'transparent'};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  justify-content: center;
  align-items: center;
`;

export const CheckboxContent = styled.View`
  justify-content: center;
  align-items: center;
`;

export const RememberMeText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
`;

export const ForgotPasswordText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.ORANGE_500};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
`;
