import React, { useState, forwardRef } from 'react'
import { InputHTMLAttributes } from 'react'
import { WrapperProps } from './styles'
import ErrorMessage from '@/components/common/ErrorMessage'
import * as S from './styles'

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    WrapperProps {
  $error?: string
  $showErrorMessage?: boolean
  $loading?: boolean
  disabled?: boolean
  label?: string
  $largePaddingRight?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      $error,
      $showErrorMessage,
      $loading,
      $largePaddingRight = false,
      disabled,
      label,
      placeholder,

      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || $loading
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus && props.onFocus(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur && props.onBlur(e)
    }

    const hasValue = props.value && props.value.toString().length > 0
    const shouldFloat = isFocused || hasValue || false

    return (
      <>
        <S.Container>
          <S.Wrapper
            $largePaddingRight={$largePaddingRight}
            {...props}
            disabled={isDisabled}
            $hasError={!!$error}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused ? placeholder : ''}
          />
          {label && (
            <S.FloatingLabel $isFloating={shouldFloat}>{label}</S.FloatingLabel>
          )}
          {$loading && <S.Spinner />}
        </S.Container>
        {$error && $showErrorMessage && <ErrorMessage $error={$error} />}
      </>
    )
  }
)

Input.displayName = 'Input'
export default Input
