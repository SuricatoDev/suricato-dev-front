import React from 'react'

import * as S from './styles'

interface SkeletonProps {
  rows?: number
  columns?: number
  width?: string
  height?: string
  gap?: string
  radius?: string
}

export function Skeleton({
  rows = 1,
  columns = 1,
  width = '100%',
  height = '0.875rem',
  gap = '8px',
  radius = '4px'
}: SkeletonProps) {
  const totalItems = rows * columns

  return (
    <S.Wrapper $columns={columns} $gap={gap}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <S.SkeletonItem
          radius={radius}
          key={index}
          width={width}
          height={height}
        />
      ))}
    </S.Wrapper>
  )
}

export default Skeleton
