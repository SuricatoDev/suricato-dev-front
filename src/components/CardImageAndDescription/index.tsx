import Image from 'next/image'
import * as S from './styles'

type CardImageAndDescriptionProps = {
  image: string | React.ReactNode
  title: string
  title_tag?: HeadingTags | TextTags
  description?: string
}

export function CardImageAndDescription({
  image,
  title,
  title_tag = 'h3',
  description
}: CardImageAndDescriptionProps) {
  return (
    <S.Wrapper className="card-image-and-description">
      {typeof image === 'string' ? (
        <Image
          className="card-image-and-description-image"
          src={image}
          alt={title ?? ''}
          width={265}
          height={265}
        />
      ) : (
        image
      )}
      <S.Info className="card-image-and-description-info">
        <S.Title className="card-image-and-description-title" as={title_tag}>
          {title}
        </S.Title>
        {description && (
          <S.Description className="card-image-and-description-description">
            {description}
          </S.Description>
        )}
      </S.Info>
    </S.Wrapper>
  )
}
