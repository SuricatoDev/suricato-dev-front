import { Pressable, Text } from 'react-native';
import { styled } from 'styled-components/native';

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';
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
        : theme.COLORS.ORANGE_300
      : type === 'PRIMARY'
        ? theme.COLORS.ORANGE_500
        : 'transparent'};

  border-radius: 6px;
  padding: 10px 24px;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border: ${({ theme, type }) =>
    type === 'PRIMARY'
      ? '2px solid transparent'
      : `2px solid ${theme.COLORS.ORANGE_500}`};
`;

export const ButtonText = styled(Text)<ButtonProps>`
  color: ${({ theme, type }) =>
    type === 'PRIMARY' ? theme.COLORS.WHITE : theme.COLORS.ORANGE_500};
  font-size: 14px;
  line-height: 18.2px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
