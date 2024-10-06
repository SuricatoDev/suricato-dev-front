import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;
  align-items: center;
  gap: 40px;
  background-color: transparent;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Logo = styled.Image`
  height: 50px;
  width: 50px;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: auto;
  gap: 40px;
`;

export const HighlightText = styled.Text`
  font-size: 28px;
  color: ${({ theme }) => theme.COLORS.ORANGE_500};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-align: center;
`;

export const MainText = styled.Text`
  font-size: 28px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-align: center;
  margin-bottom: 10px;
`;

export const CtaContainer = styled.View`
  width: 80%;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
`;
