import { AnchorHTMLAttributes, MouseEventHandler } from 'react'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import * as S from './styles'

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  size_desktop?: 'sm' | 'md'
  contrast?: boolean
  disabled?: boolean
  full_width?: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  full_width_only_mobile?: boolean
  uppercase?: boolean
}

export default function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  size_desktop,
  contrast = false,
  disabled = false,
  full_width = false,
  className,
  onClick,
  full_width_only_mobile,
  uppercase = true,
  ...props
}: ButtonLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (onClick) {
      onClick(event)
    }
  }
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <S.Wrapper
        full_width={full_width}
        contrast={contrast}
        onClick={handleClick}
        className={className}
        disabled={disabled}
        variant={variant}
        size={size}
        size_desktop={size_desktop}
        full_width_only_mobile={full_width_only_mobile}
        uppercase={uppercase}
        {...props}
      >
        {!!children && <span>{children}</span>}
      </S.Wrapper>
    </StyleSheetManager>
  )
}
