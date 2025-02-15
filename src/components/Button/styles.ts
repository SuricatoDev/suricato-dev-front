import styled, { DefaultTheme } from 'styled-components/native';
import { Button as PaperButton } from 'react-native-paper';
import { CustomButtonProps } from '.';

const getButtonColor = (theme: DefaultTheme, { variant }: Pick<CustomButtonProps, 'variant'>) => {
  switch (variant) {
    case 'primary':
      return theme.COLORS.primary;
    case 'secondary':
      return theme.COLORS.icon;
    case 'attention':
      return theme.COLORS.danger;
    default:
      return theme.COLORS.primary;
  }
};

export const StyledButton = styled(PaperButton).attrs<CustomButtonProps>(({ theme, variant }) => ({
  textColor: theme.COLORS.white,
  buttonColor: getButtonColor(theme, { variant }),
}))<CustomButtonProps>`
  border-radius: 6px;
  background-color: ${({ buttonColor }) => buttonColor};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? '0.7' : '1')};
  color: ${({ theme }) => theme.COLORS.white};
`;
