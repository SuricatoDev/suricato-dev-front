import React from 'react'

import * as S from './styles'

type ButtonOrLinkProps<T extends React.ElementType> = {
  as?: T
  children: React.ReactNode
  variant?: S.ButtonVariantType
  fullWidth?: boolean
  icon?: React.ReactNode
  loading?: boolean
  rounded?: boolean
} & React.ComponentPropsWithoutRef<T> & {
    href?: string
  }

export default function Button<T extends React.ElementType = 'button'>({
  as,
  children,
  href,
  variant = 'contained',
  fullWidth = false,
  icon,
  loading = false,
  rounded = false,
  ...rest
}: ButtonOrLinkProps<T>) {
  const Component = as || (href ? 'a' : 'button')

  return (
    <S.Button
      as={Component}
      href={href}
      $variant={variant}
      $fullWidth={fullWidth}
      $loading={loading}
      $rounded={rounded}
      disabled={loading}
      {...rest}
    >
      <span className="content">
        {icon && icon}
        <S.Content>{children}</S.Content>
      </span>
      {loading && <S.Spinner className="spinner" />}
    </S.Button>
  )
}
