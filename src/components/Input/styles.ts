import { TextInput } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TextInput)`
  flex: 1;

  min-height: 46px;
  max-height: 46px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_500};

  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};

  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;

  border-radius: 10px;

  padding: 0 16px;

  margin-bottom: 16px;
`;
