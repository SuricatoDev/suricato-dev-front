import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import Image from 'next/image'

import * as S from './styles'
import { AnchorHTMLAttributes } from 'react'

export interface LogoProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: 'sm' | 'md'
  image_url: string
  image_alt_text: string
  logo_link: string
  contrast?: boolean
  target?: '_blank' | '_self'
}

export default function Logo({
  size = 'md',
  image_alt_text = 'Logo',
  image_url,
  logo_link,
  contrast = false,
  target = '_self',
  ...props
}: LogoProps) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <S.Wrapper
        size={size}
        contrast={contrast}
        target={target}
        href={logo_link}
        {...props}
      >
        <Image src={image_url} alt={image_alt_text} height={35} width={153} />
      </S.Wrapper>
    </StyleSheetManager>
  )
}
