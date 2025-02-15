import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const StyledPickerContainer = styled.View`
  justify-content: center;
`;

export const pickerStyle = (theme: DefaultTheme, hasError: boolean, isValid: boolean) => ({
  inputIOS: {
    height: 46,
    fontSize: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: hasError
      ? theme.COLORS.RED_MID
      : isValid
        ? theme.COLORS.GREEN_MID
        : theme.COLORS.base_dark8,
    color: theme.COLORS.base_dark100,
    backgroundColor: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.MEDIUM,
    paddingRight: 30,
  },
  inputAndroid: {
    height: 46,
    fontSize: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: hasError
      ? theme.COLORS.RED_MID
      : isValid
        ? theme.COLORS.GREEN_MID
        : theme.COLORS.base_dark8,
    color: theme.COLORS.base_dark100,
    backgroundColor: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.MEDIUM,
    paddingRight: 30,
  },
  placeholder: {
    color: theme.COLORS.base_dark16,
  },
  iconContainer: {
    top: 13,
    right: 12,
  },
});
