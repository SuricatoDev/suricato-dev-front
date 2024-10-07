import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
  background-color: transparent;
`;

export const Header = styled.View`
  gap: 16px;
  margin-top: 40px;
  padding: 24px 24px 52px 24px;
  min-height: 240px;
  height: auto;
`;

export const Logo = styled.Image`
  width: 45px;
  height: 45px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.COLORS.WHITE_100};
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.COLORS.WHITE_100};
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 24px;
  margin-top: -30px;
  gap: 24px;
  flex: 1;
`;

export const ToggleButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
`;

export const ToggleButton = styled.TouchableHighlight.attrs<{
  isActive: boolean;
}>({
  underlayColor: 'transparent',
})<{ isActive: boolean }>`
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.COLORS.WHITE_100 : theme.COLORS.GRAY_100};
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.COLORS.GRAY_100 : 'transparent'};
  padding: 8px;
  border-radius: 5px;
  border-width: 1px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ToggleButtonText = styled.Text<{ isActive: boolean }>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.COLORS.GRAY_700 : theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: 14px;
  text-align: center;
`;

export const SocialButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`;

export const SocialButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  padding: 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #d1d1d1;
  border-radius: 10px;
  gap: 10px;
`;

export const SocialButtonText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
