import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const gap = 14;
const paddingHorizontal = 24;

const availableWidth = width - 2 * paddingHorizontal;
const smallCardWidth = (availableWidth - 3 * gap) / 4;
const largeCardWidth = (availableWidth - gap) / 2;

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;
  background-color: transparent;
`;

export const Categories = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: -${gap / 2}px;
  margin-right: -${gap / 2}px;
`;

export const CategoryCardWrapper = styled.View<{ large?: boolean }>`
  width: ${({ large }) => (large ? `${largeCardWidth}px` : `${smallCardWidth}px`)};
  margin: ${gap / 2}px;
  aspect-ratio: 1;
`;

export const GreetingMessage = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  margin: 24px 0;
`;
