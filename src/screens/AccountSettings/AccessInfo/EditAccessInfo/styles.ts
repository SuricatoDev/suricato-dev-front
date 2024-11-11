import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  padding: 24px;
  gap: 24px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`;

export const ButtonWrapper = styled.View`
  flex: 1;
`;
