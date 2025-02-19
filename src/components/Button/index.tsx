import { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import * as S from './styles'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  size_desktop?: 'sm' | 'md'
  contrast?: boolean
  disabled?: boolean
  full_width_only_mobile?: boolean
  full_width?: boolean
  class_name?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  uppercase?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  size_desktop,
  contrast = false,
  disabled = false,
  full_width = false,
  full_width_only_mobile = false,
  className,
  onClick,
  uppercase,
  ...props
}: ButtonProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <S.Wrapper
        as="button"
        full_width={full_width}
        contrast={contrast}
        full_width_only_mobile={full_width_only_mobile}
        onClick={handleClick}
        className={className}
        disabled={disabled}
        variant={variant}
        size={size}
        size_desktop={size_desktop}
        uppercase={uppercase}
        {...props}
      >
        {children && <span>{children}</span>}
      </S.Wrapper>
    </StyleSheetManager>
  )
}
