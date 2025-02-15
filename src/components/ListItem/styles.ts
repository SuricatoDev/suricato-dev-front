import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  padding: 20px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.text_standard};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.COLORS.text_medium};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
`;
