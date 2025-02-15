import styled from 'styled-components/native';
import { SingleTextProps } from '.';

export const StyledText = styled.Text<SingleTextProps>`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ color, theme }) => color || theme.COLORS.text_medium};
  font-family: ${({ theme }) => theme.FONT_FAMILY.SEMIBOLD};
`;
