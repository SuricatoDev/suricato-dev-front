import styled from 'styled-components/native';

interface DatePickerTextProps {
  isPlaceholder: boolean;
}

interface DatePickerButtonProps {
  hasError: boolean;
  isValid: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const DatePickerButton = styled.TouchableOpacity<DatePickerButtonProps>`
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  border-width: 2px;
  border-radius: 10px;
  padding: 0 3px 0 16px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  gap: 6px;
  border-color: ${({ theme, hasError, isValid }) => {
    if (hasError) return theme.COLORS.RED_MID;
    if (isValid) return theme.COLORS.GREEN_MID;
    return theme.COLORS.base_dark8;
  }};
`;

export const DatePickerText = styled.Text<DatePickerTextProps>`
  color: ${({ theme, isPlaceholder }) =>
    isPlaceholder ? theme.COLORS.base_dark16 : theme.COLORS.base_dark100};
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
`;
