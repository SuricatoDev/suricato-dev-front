import React, { useEffect, useState } from 'react'

import { Passenger } from '@/interfaces/passenger'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

import { SmileySad } from '@phosphor-icons/react/dist/ssr'
import { Star } from '@phosphor-icons/react/dist/ssr/Star'

import Button from '@/components/common/Button'
import ListModal from '@/components/common/ListModal'
import Modal from '@/components/common/Modal'

import * as S from './styles'

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
  const { data } = useSession()
  const userId = data?.user?.id

  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [loadingPassengers, setLoadingPassengers] = useState(true)
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

    const getPassengers = async () => {
      setLoadingPassengers(true)
      try {
        const { data } = await axios.get(
          `/api/caravana/${caravanId}/listar-passageiros`
        )
        setPassengers(data.data)
      } catch (error) {
        console.error('Falha ao buscar passageiros. Tente novamente.')
      } finally {
        setLoadingPassengers(false)
      }
    }

    getPassengers()
  }, [isOpen, caravanId])

  const startRating = (passengerId: string, value: number) => {
    setRatings((prev) => ({ ...prev, [passengerId]: value }))
    setConfirming({ id: passengerId, score: value })
  }

  const handleSubmitRating = async (id: string, score: number) => {
    setLoadingId(id)
    try {
      await axios.post(`/api/avaliacoes/registrar`, {
        passageiro_id: id,
        organizador_id: userId,
        nota: score
      })

      toast.success(`Passageiro avaliado com ${score} estrela(s)!`)

      setPassengers((prev) =>
        prev.map((p) =>
          p.passageiro_id.toString() === id ? { ...p, nota: score } : p
        )
      )

      setConfirmedRatings((prev) => ({ ...prev, [id]: score }))
    } catch {
      toast.error('Falha ao enviar avaliação. Tente novamente.')
      setRatings((prev) => {
        const copy = { ...prev }
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
      setRatings((prev) => {
        const copy = { ...prev }
        delete copy[confirming.id]
        return copy
      })
    }
    setHovered(null)
    setConfirming(null)
  }

  return (
    <>
      {isOpen && loadingPassengers && (
        <Modal
          style={{ maxWidth: '600px' }}
          $withMaxSizes={false}
          $isOpen
          onClose={onClose}
          closeButton={false}
        >
          <S.LoaderWrapper>
            <S.Loader />
          </S.LoaderWrapper>
        </Modal>
      )}

      {isOpen && !loadingPassengers && passengers.length === 0 && (
        <Modal
          style={{ maxWidth: '600px', width: 'calc(100% - 2rem)' }}
          $withMaxSizes={false}
          $isOpen
          onClose={onClose}
          closeButton={false}
        >
          <S.EmptyMessage>
            <SmileySad size={64} weight="fill" />
            Nenhuma passagiero para avaliar
          </S.EmptyMessage>
        </Modal>
      )}

      {isOpen && !loadingPassengers && passengers.length > 0 && (
        <ListModal<Passenger>
          $isOpen={isOpen}
          onClose={onClose}
          closeButton
          title={caravanTitle}
          subtitle="Avalie cada passageiro (1 a 5 estrelas):"
          items={passengers}
          withPagination
          itemsPerPageOptions={ITEMS_PER_PAGE}
          disableStatusSort
          disableRatingSort={false}
          renderItem={(p) => {
            const id = p.passageiro_id.toString()
            const initialScore = p.nota ? Math.round(Number(p.nota)) : 0
            const hasInitialRating = p.nota != null
            const confirmed = confirmedRatings[id]
            const baseScore = confirmed ?? ratings[id] ?? initialScore
            const hoverScore = hovered?.id === id ? hovered.value : 0
            const disabled =
              hasInitialRating || confirmed !== undefined || loadingId === id

            return (
              <S.PassengerRow key={id}>
                <S.Name>{p.nome}</S.Name>
                <S.Stars>
                  {[1, 2, 3, 4, 5].map((i) => {
                    const filled = i <= (hoverScore || baseScore)
                    return (
                      <S.StarButton
                        key={i}
                        disabled={disabled}
                        onMouseEnter={() =>
                          !disabled && setHovered({ id, value: i })
                        }
                        onMouseLeave={() => !disabled && setHovered(null)}
                        onClick={() => !disabled && startRating(id, i)}
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
      )}

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
              {
                passengers.find(
                  (x) => x.passageiro_id.toString() === confirming?.id
                )?.nome
              }
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
