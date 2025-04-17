import React from 'react'

import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { StarHalf } from '@phosphor-icons/react/dist/ssr/StarHalf'

import * as S from './styles'

interface RatingStarsProps {
  rating: number
}

export default function RatingStars({ rating }: RatingStarsProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5
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

  return (
    <S.Wrapper>
      {stars}
      <S.StarText>{String(rating).replace('.', ',')}</S.StarText>
    </S.Wrapper>
  )
}
