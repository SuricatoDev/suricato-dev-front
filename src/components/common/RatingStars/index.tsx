import React from 'react'

import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { StarHalf } from '@phosphor-icons/react/dist/ssr/StarHalf'

import * as S from './styles'

interface RatingStarsProps {
  rating: number | string | null
}

export default function RatingStars({ rating }: RatingStarsProps) {
  if (rating === null) {
    return (
      <S.Wrapper>
        <S.StarText>sem avaliações</S.StarText>
      </S.Wrapper>
    )
  }

  let numericRating = typeof rating === 'string' ? parseFloat(rating) : rating
  if (isNaN(numericRating)) {
    return (
      <S.Wrapper>
        <S.StarText>sem avaliações</S.StarText>
      </S.Wrapper>
    )
  }

  numericRating = Math.max(0, Math.min(5, numericRating))

  const fullStars = Math.floor(numericRating)
  const hasHalfStar = numericRating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const stars = []
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-full-${i}`} size={14} weight="fill" />)
  }
  if (hasHalfStar) {
    stars.push(<StarHalf key="star-half" size={14} weight="fill" />)
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`star-empty-${i}`} size={14} weight="regular" />)
  }

  const displayText = hasHalfStar
    ? numericRating.toFixed(1).replace('.', ',')
    : numericRating.toFixed(0)

  return (
    <S.Wrapper>
      {stars}
      <S.StarText>{displayText}</S.StarText>
    </S.Wrapper>
  )
}
