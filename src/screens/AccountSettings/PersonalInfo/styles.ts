import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  padding: 24px;
`;
