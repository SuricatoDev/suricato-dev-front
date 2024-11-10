import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type ContainerProps = {
  disabled?: boolean;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const Title = styled.Text`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const Subtitle = styled.Text<ContainerProps>`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  color: ${({ theme, disabled }) => (disabled ? theme.COLORS.GRAY_200 : theme.COLORS.GRAY_600)};
`;
