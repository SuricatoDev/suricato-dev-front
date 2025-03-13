import { InputHTMLAttributes, Ref } from 'react'
import { WrapperProps } from './styles'
import ErrorMessage from '@/components/common/ErrorMessage'
import * as S from './styles'

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    WrapperProps {
  $error?: string
  $showErrorMessage?: boolean
  ref?: Ref<HTMLInputElement>
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
