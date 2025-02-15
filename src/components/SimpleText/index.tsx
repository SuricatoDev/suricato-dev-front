import * as S from './styles';

export interface SingleTextProps {
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | number;
  color?: string;
  children: React.ReactNode;
}

export const SingleText: React.FC<SingleTextProps> = ({
  fontSize,
  fontWeight,
  color,
  children,
}) => {
  return (
    <S.StyledText fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {children}
    </S.StyledText>
  );
};
