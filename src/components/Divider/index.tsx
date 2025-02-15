import * as S from './styles';

export interface DividerProps {
  text?: string;
  marginVertical?: number;
}

export function Divider({ text, marginVertical }: DividerProps) {
  return (
    <S.Container marginVertical={marginVertical}>
      <S.LineOne />
      {text && <S.TextDivider>{text}</S.TextDivider>}
      <S.LineTwo />
    </S.Container>
  );
}
