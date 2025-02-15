import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Wrapper = styled.View`
  gap: 24px;
`;

export const Header = styled.View`
  gap: 16px;
  margin-top: 24px;
  padding: 24px 24px 52px 24px;
  min-height: 220px;
  height: auto;
`;

export const Logo = styled.Image`
  width: 45px;
  height: 45px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.COLORS.white};
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.COLORS.white};
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.COLORS.background};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 24px;
  margin-top: -40px;
  gap: 24px;
  flex: 1;
  z-index: 2;
`;

export const ToggleButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.base_dark8};
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
`;

export const ToggleButton = styled.TouchableHighlight.attrs<{
  isActive: boolean;
}>(({ theme }) => ({
  underlayColor: theme.COLORS.background,
}))<{ isActive: boolean }>`
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.COLORS.background : theme.COLORS.base_dark8};
  border-color: ${({ theme }) => theme.COLORS.base_dark8};
  padding: 8px;
  border-radius: 5px;
  border-width: 1px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ToggleButtonText = styled.Text<{ isActive: boolean }>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.COLORS.text_standard : theme.COLORS.text_medium};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: 14px;
  text-align: center;
`;
