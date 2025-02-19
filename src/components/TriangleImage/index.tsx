import Image from 'next/image'
import * as S from './styles'

export interface TriangleImageProps {
  image_url: string
  text_alt?: string
}

export default function TriangleImage({
  image_url,
  text_alt
}: TriangleImageProps) {
  return (
    <S.Wrapper className="triangle-image">
      <div className="triangle-container">
        <svg viewBox="0 0 14 14"></svg>
        <div className="triangle-mask">
          <Image
            className="triangle-image"
            width={400}
            height={400}
            quality={90}
            src={image_url}
            alt={text_alt ?? ''}
            fetchPriority="low"
            loading="lazy"
          />
        </div>
      </div>
    </S.Wrapper>
  )
}
