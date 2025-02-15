import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Wrapper = styled(SafeAreaView)`
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
