import * as S from './styles';

type ErrorTextProps = {
  children: string;
};

export function ErrorText({ children }: ErrorTextProps) {
  return <S.Container>{children}</S.Container>;
}
