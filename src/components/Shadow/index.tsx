import React, { useEffect } from 'react'
import { StyleSheetManager } from 'styled-components'
import * as S from './styles'
import isPropValid from '@emotion/is-prop-valid'

export interface ShadowProps {
  color?: string
  opacity?: string
  className?: string
  onClick?: () => void
}

export default function Shadow({
  color = '#000000',
  opacity = '0.75',
  onClick,
  className
}: ShadowProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) =>
        isPropValid(prop) || prop === 'color' || prop === 'opacity'
      }
    >
      <S.Wrapper
        className={`shadow ${className ? className : ''}`}
        color={color}
        opacity={opacity}
        onClick={onClick}
      />
    </StyleSheetManager>
  )
}
