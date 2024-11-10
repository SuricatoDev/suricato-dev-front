import * as S from './styles';

type HeadingWithSubtitleProps = {
  title: string;
  subtitle: string;
};

export function HeadingWithSubtitle({ title, subtitle }: HeadingWithSubtitleProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
    </S.Container>
  );
}
