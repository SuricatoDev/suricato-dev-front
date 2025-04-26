import React, { useEffect, useMemo, useState } from 'react'

import { CaretDoubleLeft, CaretRight, X } from '@phosphor-icons/react'
import { CaretDoubleRight, CaretLeft } from '@phosphor-icons/react/dist/ssr'

import * as S from './styles'

export type ListModalProps<T> = {
  $isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  items: T[]
  renderItem: (item: T, idx: number) => React.ReactNode
  itemsPerPageOptions?: number
  withPagination?: boolean
  closeButton?: boolean
}

export default function ListModal<T>({
  $isOpen,
  onClose,
  title,
  subtitle,
  items,
  renderItem,
  itemsPerPageOptions = 6,
  withPagination = true,
  closeButton = true
}: ListModalProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = itemsPerPageOptions
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))

  useEffect(() => {
    setCurrentPage(1)
  }, [items, itemsPerPage])

  const paginationRange = useMemo<number[]>(() => {
    const windowSize = 3
    let start = currentPage - 1
    let end = currentPage + 1

    if (start < 1) {
      start = 1
      end = Math.min(windowSize, totalPages)
    }

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, totalPages - (windowSize - 1))
    }

    const pages: number[] = []
    for (let p = start; p <= end; p++) {
      pages.push(p)
    }
    return pages
  }, [currentPage, totalPages])

  if (!$isOpen) return null

  const startIdx = (currentPage - 1) * itemsPerPage
  const pageItems = withPagination
    ? items.slice(startIdx, startIdx + itemsPerPage)
    : items

  return (
    <S.Shadow onClick={onClose}>
      <S.Container onClick={(e) => e.stopPropagation()}>
        {closeButton && (
          <S.Header>
            <S.CloseButton onClick={onClose}>
              <X size={24} weight="bold" />
            </S.CloseButton>
            <S.Title>{title}</S.Title>
          </S.Header>
        )}

        <S.Body>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
          <S.List>
            {pageItems.map((item, idx) => (
              <>
                <S.ListItem key={idx}>{renderItem(item, idx)}</S.ListItem>
              </>
            ))}
          </S.List>
        </S.Body>

        {withPagination && totalPages > 1 && (
          <S.Footer>
            <S.ArrowButton
              className="first"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <CaretDoubleLeft size={18} weight="bold" />
            </S.ArrowButton>
            <S.ArrowButton
              className="prev"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <CaretLeft size={18} weight="bold" />
            </S.ArrowButton>

            <S.PagesWrapper>
              {paginationRange.map((p) => (
                <S.PageButton
                  key={p}
                  active={p === currentPage}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </S.PageButton>
              ))}
            </S.PagesWrapper>

            <S.ArrowButton
              className="next"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <CaretRight size={18} weight="bold" />
            </S.ArrowButton>
            <S.ArrowButton
              className="last"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              <CaretDoubleRight size={18} weight="bold" />
            </S.ArrowButton>
          </S.Footer>
        )}
      </S.Container>
    </S.Shadow>
  )
}
