import { TextInput } from 'react-native';
import styled from 'styled-components/native';

interface TextInputStyleProps {
  editable: boolean;
  hasError: boolean;
  isValid: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const TextInputStyle = styled(TextInput)<TextInputStyleProps>`
  height: 46px;
  min-height: 46px;
  border-width: 2px;
  border-radius: 10px;
  padding: 0 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_600};
  background-color: ${({ theme, editable }) =>
    editable ? theme.COLORS.WHITE : theme.COLORS.GRAY_100};
  border-color: ${({ theme, hasError, isValid }) => {
    if (hasError) {
      return theme.COLORS.RED_MID;
    }
    if (isValid) {
      return theme.COLORS.GREEN_MID;
    }
    return theme.COLORS.GRAY_100;
  }};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  opacity: ${({ editable }) => (editable ? 1 : 0.6)};
`;
