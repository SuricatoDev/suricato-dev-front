import React, { forwardRef, useState } from 'react'
import { TextareaHTMLAttributes } from 'react'

import ErrorMessage from '@/components/common/ErrorMessage'

import { WrapperProps } from './styles'
import * as S from './styles'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    WrapperProps {
  $error?: string
  $showErrorMessage?: boolean
  label?: string
  disabled?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { $error, $showErrorMessage, disabled, label, placeholder, ...props },
    ref
  ) => {
    const isDisabled = disabled
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true)
      props.onFocus && props.onFocus(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      props.onBlur && props.onBlur(e)
    }

    const hasValue = props.value && props.value.toString().length > 0
    const shouldFloat = isFocused || hasValue || false

    return (
      <>
        <S.Container>
          <S.Wrapper
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
        </S.Container>
        {$error && $showErrorMessage && <ErrorMessage $error={$error} />}
      </>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
