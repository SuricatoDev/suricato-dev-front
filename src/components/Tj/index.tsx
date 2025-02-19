import { StyleSheetManager } from 'styled-components'
import * as S from './styles'
import isPropValid from '@emotion/is-prop-valid'

export interface TjProps {
  children: React.ReactNode
  contrast?: boolean
  align?: 'center' | 'left' | 'right'
  size?: 'auto' | 'md' | 'lg'
}

export default function Tj({
  children,
  contrast = false,
  align = 'center',
  size = 'md'
}: TjProps) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <S.Wrapper className="tj" contrast={contrast} align={align} size={size}>
        {children}
      </S.Wrapper>
    </StyleSheetManager>
  )
}
