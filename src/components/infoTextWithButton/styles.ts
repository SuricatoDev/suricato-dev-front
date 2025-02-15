import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { InfoTextWithButtonProps } from '.';

export const Container = styled(TouchableOpacity)<Pick<InfoTextWithButtonProps, 'disabled'>>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const Title = styled.Text`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  color: ${({ theme }) => theme.COLORS.text_standard};
`;

export const Subtitle = styled.Text<Pick<InfoTextWithButtonProps, 'disabled'>>`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  color: ${({ theme, disabled }) =>
    disabled ? theme.COLORS.text_disabled : theme.COLORS.text_standard};
`;
