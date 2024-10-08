import styled from 'styled-components/native';

export const FormContainer = styled.View`
  margin-top: -16px;
`;

export const PasswordField = styled.View`
  position: relative;
  width: 100%;
`;

export const EyeButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  padding: 0 16px;
  height: 46px;
  border-radius: 0 10px 10px 0;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  margin-top: -16px;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  gap: 8px;
`;

interface ButtonProps {
  active: boolean;
}

export const SelectButton = styled.TouchableOpacity<ButtonProps>`
  flex: 1;

  border-radius: 6px;
  padding: 10px 24px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${({ active, theme }) => (active ? theme.COLORS.ORANGE_700 : theme.COLORS.GRAY_100)};
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-size: 14px;
  line-height: 18.2px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ active, theme }) => (active ? theme.COLORS.ORANGE_700 : theme.COLORS.GRAY_300)};
`;
