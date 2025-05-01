import React, { forwardRef } from 'react'

import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown'

import ErrorMessage from '@/components/common/ErrorMessage'

import { WrapperProps } from './styles'
import * as S from './styles'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    WrapperProps {
  options: SelectOption[]
  error?: string
  showErrorMessage?: boolean
  placeholder?: string
  label?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      error,
      showErrorMessage,
      disabled,
      placeholder,
      label,
      borderRadiusTop,
      borderRadiusBottom,
      borderTop,
      borderBottom,
      hasError,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <S.Container>
          <S.Wrapper
            as="select"
            {...props}
            ref={ref}
            disabled={disabled}
            hasError={!!error || hasError}
            borderRadiusTop={borderRadiusTop}
            borderRadiusBottom={borderRadiusBottom}
            borderTop={borderTop}
            borderBottom={borderBottom}
            $hasFloatingLabel={!!label}
            value={value}
            onChange={onChange}
          >
            <option value="">{placeholder ?? 'Selecione…'}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </S.Wrapper>

          {label && <S.FloatingLabel $isFloating>{label}</S.FloatingLabel>}

          <S.IconWrapper>
            <CaretDown size={20} weight="bold" />
          </S.IconWrapper>
        </S.Container>

        {error && showErrorMessage && <ErrorMessage error={error} />}
      </>
    )
  }
)

Select.displayName = 'Select'
export default Select
