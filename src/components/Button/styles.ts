import { Pressable, Text } from 'react-native';
import { styled } from 'styled-components/native';

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY' | 'ATTENTION';
export type ButtonIconStyleProps = 'PLUS' | 'EDIT' | 'DELETE' | 'CARET_RIGHT';
export type ButtonFullWidthStyleProps = boolean;

type ButtonProps = {
  type: ButtonTypeStyleProps;
  icon?: ButtonIconStyleProps;
  fullWidth?: ButtonFullWidthStyleProps;
  isPressed?: boolean;
};

export const Container = styled(Pressable)<ButtonProps>`
  background-color: ${({ theme, type, isPressed }) =>
    isPressed
      ? type === 'PRIMARY'
        ? theme.COLORS.ORANGE_300
        : type === 'ATTENTION'
          ? theme.COLORS.RED_DARK
          : theme.COLORS.ORANGE_500
      : type === 'PRIMARY'
        ? theme.COLORS.ORANGE_500
        : type === 'ATTENTION'
          ? theme.COLORS.RED_MID
          : 'transparent'};

  border-radius: 6px;
  padding: 10px 24px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border: ${({ theme, type }) =>
    type === 'PRIMARY'
      ? '2px solid transparent'
      : type === 'ATTENTION'
        ? `2px solid ${theme.COLORS.RED_MID}`
        : `2px solid ${theme.COLORS.ORANGE_500}`};
  opacity: ${({ disabled, isPressed, type }) => (disabled || (isPressed && type === 'PRIMARY') ? 0.6 : 1)};
`;

export const ButtonText = styled(Text)<ButtonProps>`
  color: ${({ theme, type, isPressed }) =>
    type === 'PRIMARY' || type === 'ATTENTION' || isPressed ? theme.COLORS.WHITE : theme.COLORS.ORANGE_500};
  font-size: 14px;
  line-height: 18.2px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
