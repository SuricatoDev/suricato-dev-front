import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
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
  border-color: ${({ active, theme }) =>
    active ? theme.COLORS.ORANGE_700 : theme.COLORS.GRAY_100};
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-size: 14px;
  line-height: 18.2px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ active, theme }) =>
    active ? theme.COLORS.ORANGE_700 : theme.COLORS.GRAY_300};
`;
