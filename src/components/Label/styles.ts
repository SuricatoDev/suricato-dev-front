import styled from 'styled-components/native';
import { Text } from 'react-native';

// Defina o Container como um componente `Text` com suporte a `ref`
export const Container = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  margin-bottom: 5px;
`;
