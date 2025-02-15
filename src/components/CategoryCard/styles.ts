import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{ size: 'lg' | 'md' }>`
  flex-direction: ${({ size }) => (size === 'lg' ? 'row' : 'column-reverse')};
  align-items: ${({ size }) => (size === 'lg' ? 'start' : 'center')};
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  height: 100px;
`;

export const Title = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
  color: ${({ theme }) => theme.COLORS.text_standard};
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  margin: auto 0;
`;
