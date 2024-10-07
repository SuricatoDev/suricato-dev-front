import styled from 'styled-components/native';
import MaskInput from 'react-native-mask-input';

interface StyledInputProps {
  hasError: boolean;
  isValid: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const StyledMaskInput = styled(MaskInput)<StyledInputProps>`
  height: 46px;
  border-width: 2px;
  border-radius: 10px;
  font-size: 14px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};

  border-color: ${({ theme, hasError, isValid }) => {
    if (hasError) {
      return theme.COLORS.RED_MID;
    }
    if (isValid) {
      return theme.COLORS.GREEN_MID;
    }
    return theme.COLORS.GRAY_100;
  }};

  color: ${({ theme }) => theme.COLORS.GRAY_600};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
`;
