import { InputHTMLAttributes } from 'react'
import { WrapperProps } from './styles'
import * as S from './styles'

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    WrapperProps {}

export default function Input(props: InputProps) {
  return <S.Wrapper {...props} />
}
