import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Passenger } from '@/interfaces/passenger'
import { Reservation } from '@/interfaces/reservation'

import { CaretDoubleLeft } from '@phosphor-icons/react/dist/ssr/CaretDoubleLeft'
import { CaretDoubleRight } from '@phosphor-icons/react/dist/ssr/CaretDoubleRight'
import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import { CaretUp } from '@phosphor-icons/react/dist/ssr/CaretUp'
import { X } from '@phosphor-icons/react/dist/ssr/X'

import Input from '../Input'
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
  disableStatusSort?: boolean
  disableRatingSort?: boolean
}

export default function ListModal<T extends Reservation | Passenger>({
  $isOpen,
  onClose,
  title,
  subtitle,
  items,
  renderItem,
  itemsPerPageOptions = 6,
  withPagination = true,
  closeButton = true,
  disableStatusSort = false,
  disableRatingSort = true
}: ListModalProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusSort, setStatusSort] = useState<'none' | 'asc' | 'desc'>('none')
  const [nameSort, setNameSort] = useState<'none' | 'asc' | 'desc'>('none')
  const [ratingSort, setRatingSort] = useState<'none' | 'asc' | 'desc'>('none')
  const [currentPage, setCurrentPage] = useState(1)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const itemsPerPage = itemsPerPageOptions

  const cycleStatusSort = () =>
    setStatusSort((s) => (s === 'none' ? 'asc' : s === 'asc' ? 'desc' : 'none'))
  const cycleNameSort = () =>
    setNameSort((s) => (s === 'none' ? 'asc' : s === 'asc' ? 'desc' : 'none'))
  const cycleRatingSort = () =>
    setRatingSort((s) => (s === 'none' ? 'asc' : s === 'asc' ? 'desc' : 'none'))

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return items
    if (/^\d+$/.test(term)) {
      return items.filter((item) => String(item.passageiro_id) === term)
    }
    return items.filter((item) => item.nome?.toLowerCase().includes(term))
  }, [items, searchTerm])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (
        !disableRatingSort &&
        ratingSort !== 'none' &&
        'nota' in a &&
        'nota' in b
      ) {
        const aRt = Number(a.nota) || 0
        const bRt = Number(b.nota) || 0
        const diff = ratingSort === 'asc' ? aRt - bRt : bRt - aRt
        if (diff !== 0) {
          return diff
        }
      }

      if (!disableStatusSort && statusSort !== 'none') {
        const aSt = 'status' in a && a.status === 'Pendente' ? 0 : 1
        const bSt = 'status' in b && b.status === 'Pendente' ? 0 : 1
        const diff = statusSort === 'asc' ? aSt - bSt : bSt - aSt

        if (diff !== 0) {
          return diff
        }
      }

      if (nameSort !== 'none') {
        const aNm = a.nome ?? ''
        const bNm = b.nome ?? ''
        return nameSort === 'asc'
          ? aNm.localeCompare(bNm)
          : bNm.localeCompare(aNm)
      }

      return 0
    })
  }, [
    filtered,
    statusSort,
    nameSort,
    ratingSort,
    disableStatusSort,
    disableRatingSort
  ])

  const totalPages = Math.max(1, Math.ceil(sorted.length / itemsPerPage))

  useEffect(
    () => setCurrentPage(1),
    [
      searchTerm,
      statusSort,
      nameSort,
      ratingSort,
      itemsPerPage,
      items,
      disableStatusSort,
      disableRatingSort
    ]
  )

  useEffect(() => {
    document.body.style.overflow = $isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [$isOpen])

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const check = () => {
      const overflow = el.scrollHeight > el.clientHeight
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight
      setCanScrollDown(overflow && !atBottom)
    }
    check()
    el.addEventListener('scroll', check)
    window.addEventListener('resize', check)
    return () => {
      el.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [sorted, withPagination])

  const paginationRange = useMemo(() => {
    const win = 3
    let start = currentPage - 1
    let end = currentPage + 1
    if (start < 1) {
      start = 1
      end = Math.min(win, totalPages)
    }
    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, totalPages - (win - 1))
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [currentPage, totalPages])

  if (!$isOpen) return null

  const startIdx = (currentPage - 1) * itemsPerPage
  const pageItems = withPagination
    ? sorted.slice(startIdx, startIdx + itemsPerPage)
    : sorted

  return (
    <S.Shadow onClick={onClose}>
      <S.Container
        onClick={(e) => e.stopPropagation()}
        withPagination={withPagination}
        showGradient={canScrollDown}
      >
        {closeButton && (
          <S.Header>
            <S.CloseButton onClick={onClose}>
              <X size={24} weight="bold" />
            </S.CloseButton>
            <S.Title>{title}</S.Title>
          </S.Header>
        )}

        <S.Body ref={bodyRef} withPagination={withPagination}>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}

          <Input
            label="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou ID…"
          />

          <S.SortContainer>
            {!disableStatusSort && (
              <S.SortButton
                active={statusSort !== 'none'}
                onClick={cycleStatusSort}
              >
                Status{' '}
                {statusSort === 'asc' && <CaretUp size={16} weight="bold" />}
                {statusSort === 'desc' && <CaretDown size={16} weight="bold" />}
              </S.SortButton>
            )}

            <S.SortButton active={nameSort !== 'none'} onClick={cycleNameSort}>
              Nome {nameSort === 'asc' && <CaretUp size={16} weight="bold" />}
              {nameSort === 'desc' && <CaretDown size={16} weight="bold" />}
            </S.SortButton>

            {!disableRatingSort && (
              <S.SortButton
                active={ratingSort !== 'none'}
                onClick={cycleRatingSort}
              >
                Nota{' '}
                {ratingSort === 'asc' && <CaretUp size={16} weight="bold" />}
                {ratingSort === 'desc' && <CaretDown size={16} weight="bold" />}
              </S.SortButton>
            )}
          </S.SortContainer>

          <S.List>
            {pageItems.map((item, idx) => (
              <S.ListItem key={idx}>{renderItem(item, idx)}</S.ListItem>
            ))}
          </S.List>
        </S.Body>

        {withPagination && totalPages > 1 && (
          <S.Footer>
            <S.ArrowButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <CaretDoubleLeft size={18} weight="bold" />
            </S.ArrowButton>
            <S.ArrowButton
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
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <CaretRight size={18} weight="bold" />
            </S.ArrowButton>
            <S.ArrowButton
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
