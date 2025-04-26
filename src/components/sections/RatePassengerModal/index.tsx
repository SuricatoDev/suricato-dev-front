import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'

import { Star } from '@phosphor-icons/react'

import Button from '@/components/common/Button'
import ListModal from '@/components/common/ListModal'
import Modal from '@/components/common/Modal'

import * as S from './styles'

export interface Passenger {
  id: string
  userName: string
}

interface RatePassengerModalProps {
  caravanId: string
  caravanTitle: string
  isOpen: boolean
  onClose: () => void
}

const ITEMS_PER_PAGE = 10

export default function RatePassengerModal({
  caravanId,
  caravanTitle,
  isOpen,
  onClose
}: RatePassengerModalProps) {
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [confirmedRatings, setConfirmedRatings] = useState<
    Record<string, number>
  >({})
  const [hovered, setHovered] = useState<{ id: string; value: number } | null>(
    null
  )
  const [confirming, setConfirming] = useState<{
    id: string
    score: number
  } | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const names = [
      'Gabriel Galoneto',
      'Paulo Silva',
      'Maria Souza',
      'José Oliveira',
      'Ana Pereira',
      'Lucas Almeida',
      'Mariana Costa',
      'Rafael Santos',
      'Beatriz Rocha',
      'Pedro Lima',
      'Camila Mendes',
      'Thiago Gomes',
      'Fernanda Ribeiro',
      'Bruno Fernandes',
      'Juliana Alves',
      'Gustavo Carvalho',
      'Patrícia Barbosa',
      'Leandro Ferreira',
      'Isabela Martins',
      'Ricardo Dias'
    ]
    setPassengers(names.map((userName, i) => ({ id: String(i), userName })))
    setRatings({})
    setConfirmedRatings({})
    setConfirming(null)
  }, [isOpen])

  const cycleConfirm = (id: string, value: number) => {
    setRatings((r) => ({ ...r, [id]: value }))
    setConfirming({ id, score: value })
  }

  const handleSubmitRating = async (id: string, score: number) => {
    setLoadingId(id)
    try {
      await axios.post(`/api/caravanas/${caravanId}/reservas/${id}/avaliar`, {
        rating: score
      })
      toast.success(`Passageiro avaliado com ${score} estrela(s)!`)
      setConfirmedRatings((cr) => ({ ...cr, [id]: score }))
    } catch {
      toast.error('Falha ao enviar avaliação. Tente novamente.')

      setRatings((r) => {
        const copy = { ...r }
        delete copy[id]
        return copy
      })
    } finally {
      setLoadingId(null)
      setConfirming(null)
    }
  }

  const handleCancelConfirm = () => {
    if (confirming) {
      setRatings((r) => {
        const copy = { ...r }
        delete copy[confirming.id]
        return copy
      })
    }
    setHovered(null)
    setConfirming(null)
  }

  return (
    <>
      <ListModal<Passenger & { rating: number }>
        $isOpen={isOpen}
        onClose={onClose}
        closeButton
        title={caravanTitle}
        subtitle="Avalie cada passageiro (1 a 5 estrelas):"
        items={passengers.map((p) => ({
          ...p,
          rating: confirmedRatings[p.id] ?? ratings[p.id] ?? 0
        }))}
        withPagination
        itemsPerPageOptions={ITEMS_PER_PAGE}
        disableStatusSort
        disableRatingSort={false}
        renderItem={(p) => {
          const confirmed = confirmedRatings[p.id]
          const baseScore = confirmed ?? ratings[p.id] ?? 0
          const hoverScore = hovered?.id === p.id ? hovered.value : 0
          const disabled = !!confirmed || loadingId === p.id

          return (
            <S.PassengerRow>
              <S.Name>{p.userName}</S.Name>
              <S.Stars>
                {[1, 2, 3, 4, 5].map((i) => {
                  const filled = i <= (hoverScore || baseScore)
                  return (
                    <S.StarButton
                      key={i}
                      disabled={disabled}
                      onMouseEnter={() =>
                        !disabled && setHovered({ id: p.id, value: i })
                      }
                      onMouseLeave={() => !disabled && setHovered(null)}
                      onClick={() => !disabled && cycleConfirm(p.id, i)}
                    >
                      <Star size={20} weight={filled ? 'fill' : 'regular'} />
                    </S.StarButton>
                  )
                })}
              </S.Stars>
            </S.PassengerRow>
          )
        }}
      />

      <Modal
        $isOpen={!!confirming}
        onClose={handleCancelConfirm}
        closeButton={false}
      >
        <S.ModalContent>
          <h3>Confirmar avaliação</h3>
          <p>
            Essa ação é irreversível. Deseja realmente avaliar{' '}
            <strong>
              {passengers.find((x) => x.id === confirming?.id)?.userName}
            </strong>{' '}
            com <b>{confirming?.score}</b> estrela(s)?
          </p>
          <S.ModalButtons>
            <Button
              variant="outlined"
              onClick={handleCancelConfirm}
              disabled={loadingId !== null}
            >
              Cancelar
            </Button>
            <Button
              onClick={() =>
                confirming &&
                handleSubmitRating(confirming.id, confirming.score)
              }
              loading={loadingId === confirming?.id}
              disabled={loadingId !== null}
            >
              Confirmar
            </Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>
    </>
  )
}
