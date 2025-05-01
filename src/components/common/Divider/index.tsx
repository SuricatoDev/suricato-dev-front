import * as S from './styles'

export type DividerProps = {
  children?: React.ReactNode
  marginY?: string
}

export default function Divider({ children, marginY }: DividerProps) {
  return <S.Divider marginY={marginY}>{children}</S.Divider>
}
