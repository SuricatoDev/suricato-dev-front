import * as S from './styles'

type ErrorMessageProps = {
  $error?: string
}

export default function ErrorMessage({ $error }: ErrorMessageProps) {
  if (!$error) return null
  return <S.Wrapper>{$error}</S.Wrapper>
}
