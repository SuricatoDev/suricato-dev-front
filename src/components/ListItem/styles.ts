import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  border: 0px solid ${({ theme }) => theme.COLORS.GRAY_100};
  border-bottom-width: 1px;
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
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
`;
