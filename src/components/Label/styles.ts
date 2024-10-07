import styled from 'styled-components/native';
import { Text } from 'react-native';

export const Container = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  margin-bottom: 5px;
  margin-top: 16px;
`;
