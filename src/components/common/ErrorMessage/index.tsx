import { WarningCircle } from '@phosphor-icons/react/dist/ssr/WarningCircle'

import * as S from './styles'

type ErrorMessageProps = {
  error?: string
  withIcon?: boolean
}

export default function ErrorMessage({ error, withIcon }: ErrorMessageProps) {
  if (!error) return null
  return (
    <S.Wrapper>
      {withIcon && <WarningCircle size={16} weight="fill" />}
      {error}
    </S.Wrapper>
  )
}
