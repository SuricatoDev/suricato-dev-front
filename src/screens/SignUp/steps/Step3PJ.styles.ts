import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`;

interface ButtonProps {
  active: boolean;
}

export const SelectButton = styled.TouchableOpacity<ButtonProps>`
  flex: 1;

  min-height: 46px;
  max-height: 46px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_500};

  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};

  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  border-color: red;

  border-radius: 10px;
  justify-content: center;
  align-items: center;

  padding: 0 16px;
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-size: 14px;
  line-height: 18.2px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ active, theme }) =>
    active ? theme.COLORS.ORANGE_700 : theme.COLORS.GRAY_300};
`;
