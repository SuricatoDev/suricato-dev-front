import * as S from './styles'

type LabelProps = {
  children: React.ReactNode
}

export default function Label({ children }: LabelProps) {
  return <S.Wrapper>{children}</S.Wrapper>
}
