import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: -16px;
  background-color: #ffffff;
`;

export const DatePickerButton = styled.TouchableOpacity`
  flex: 1;
  min-height: 46px;
  max-height: 46px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  justify-content: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 10px;
`;

export const DatePickerText = styled.Text<{ isPlaceholder: boolean }>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme, isPlaceholder }) =>
    isPlaceholder ? theme.COLORS.GRAY_300 : theme.COLORS.GRAY_600};
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: red;
  margin-top: 5px;
`;
