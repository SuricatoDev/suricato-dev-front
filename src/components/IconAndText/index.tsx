import Image from 'next/image'
import * as S from './styles'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

export type IconAndTextProps = {
  icon: React.ReactNode | string
  text?: string
  width?: number
  height?: number
  link?: string
  background_color?: string
  border_radius?: string
  onClick?: () => void
}

export function IconAndText({
  icon,
  text,
  width,
  height,
  border_radius,
  link,
  background_color,
  onClick
}: IconAndTextProps) {
  const WrapperComponent = link ? 'a' : 'div'

  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <S.Wrapper
        onClick={() => {
          onClick?.()
        }}
        as={WrapperComponent}
        href={link || undefined}
      >
        <S.IconContainer
          width={width}
          height={height}
          border_radius={border_radius}
          background_color={background_color}
        >
          {typeof icon === 'string' ? (
            <Image
              src={icon}
              alt={text ?? ''}
              width={width}
              height={height}
              quality={85}
            />
          ) : (
            icon
          )}
        </S.IconContainer>
        {text && <S.Text>{text}</S.Text>}
      </S.Wrapper>
    </StyleSheetManager>
  )
}
