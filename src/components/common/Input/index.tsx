import { InputHTMLAttributes } from 'react'
import { WrapperProps } from './styles'
import * as S from './styles'
import ErrorMessage from '../ErrorMessage'

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    WrapperProps {
  $error?: string
  $showErrorMessage?: boolean
}

export default function Input({
  $error,
  $showErrorMessage,
  ...props
}: InputProps) {
  return (
    <>
      <S.Wrapper {...props} $hasError={!!$error} />
      {$error && $showErrorMessage && <ErrorMessage $error={$error} />}
    </>
  )
}
