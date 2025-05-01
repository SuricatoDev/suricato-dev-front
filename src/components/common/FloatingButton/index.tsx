import React, { forwardRef } from 'react'

import { Plus } from '@phosphor-icons/react'

import * as S from './styles'

export interface FloatingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon?: React.ReactNode
  size?: number
  top?: number
  bottom?: number
  left?: number
  right?: number
  animate?: boolean
  iconColor?: string
  backgroundColor?: string
  borderColor?: string
}

export const FloatingButton = forwardRef<
  HTMLButtonElement,
  FloatingButtonProps
>(
  (
    {
      icon = <Plus size={28} weight="bold" />,
      size = 60,
      top,
      bottom = 16,
      left,
      right = 16,
      animate = true,
      iconColor,
      backgroundColor,
      borderColor,
      ...rest
    },
    ref
  ) => (
    <S.StyledFab
      ref={ref}
      size={size}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      animate={animate}
      iconColor={iconColor}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      {...rest}
    >
      {icon}
    </S.StyledFab>
  )
)

FloatingButton.displayName = 'FloatingButton'
export default FloatingButton
