import React, { useEffect, useState } from 'react'

import { Reservation } from '@/interfaces/reservation'
import axios from 'axios'
import { toast } from 'react-toastify'

import { SmileySad } from '@phosphor-icons/react/dist/ssr/SmileySad'

import Button from '@/components/common/Button'
import ListModal from '@/components/common/ListModal'
import Modal from '@/components/common/Modal'

import * as S from './styles'

interface ReservationConfirmationModalProps {
  caravanId: string
  caravanTitle: string
  isOpen: boolean
  onClose: () => void
}

const ITEMS_PER_PAGE = 10

export default function ReservationConfirmationModal({
  caravanId,
  caravanTitle,
  isOpen,
  onClose
}: ReservationConfirmationModalProps) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loadingReservations, setLoadingReservations] = useState(true)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [reservationId, setReservationId] = useState<string | null>(null)
  const [isApproving, setIsApproving] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const fetchReservations = async () => {
      setLoadingReservations(true)
      try {
        const { data } = await axios.get(`/api/caravana/${caravanId}`)
        const dataFiltered = data.data.filter(
          (r: Reservation) => r.status !== 'Cancelado'
        )
        setReservations(dataFiltered)
      } catch {
        console.error('Falha ao buscar reservas. Tente novamente.')
      } finally {
        setLoadingReservations(false)
      }
    }

    fetchReservations()
  }, [isOpen, caravanId])

  const handleApprove = async (idPassenger: string, idReservation: string) => {
    setIsApproving(true)
    try {
      await axios.put(`/api/caravana/${caravanId}/reserva/${idReservation}`, {
        status: 'Confirmado'
      })
      setReservations((prev) =>
        prev.map((r) =>
          String(r.passageiro_id) === idPassenger
            ? { ...r, status: 'Confirmado' }
            : r
        )
      )
      toast.success('Reserva aprovada com sucesso!')
      setConfirmingId(null)
    } catch {
      toast.error('Falha ao aprovar reserva. Tente novamente.')
    } finally {
      setIsApproving(false)
    }
  }

  return (
    <>
      {isOpen && loadingReservations && (
        <Modal
          style={{ maxWidth: '600px', width: 'calc(100% - 2rem)' }}
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

      {isOpen && !loadingReservations && reservations.length === 0 && (
        <Modal
          style={{ maxWidth: '600px', width: 'calc(100% - 2rem)' }}
          $withMaxSizes={false}
          $isOpen
          onClose={onClose}
          closeButton={false}
        >
          <S.EmptyMessage>
            <SmileySad size={64} weight="fill" />
            Nenhuma reserva para confirmar
          </S.EmptyMessage>
        </Modal>
      )}

      {isOpen && !loadingReservations && reservations.length > 0 && (
        <ListModal<Reservation>
          $isOpen={isOpen}
          onClose={onClose}
          closeButton
          title={caravanTitle}
          subtitle="Confira a lista de passageiros aguardando aprovação:"
          items={reservations}
          withPagination
          itemsPerPageOptions={ITEMS_PER_PAGE}
          renderItem={(r) => (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <S.Dot status={r.status} />
                <S.Name>{r.nome}</S.Name>
              </div>
              <Button
                size="sm"
                disabled={r.status === 'Confirmado'}
                onClick={() => {
                  if (r.status === 'Pendente') {
                    setConfirmingId(String(r.passageiro_id))
                    setReservationId(String(r.reserva_id))
                  }
                }}
              >
                Aprovar
              </Button>
            </>
          )}
        />
      )}

      <Modal
        $isOpen={confirmingId !== null}
        onClose={() => setConfirmingId(null)}
        closeButton={false}
      >
        <S.ModalContent>
          <h3>Confirmar aprovação</h3>
          <p>
            Essa ação é irreversível. Deseja realmente aprovar o(a)
            passageiro(a){' '}
            <strong>
              <u>
                {
                  reservations.find(
                    (r) => String(r.passageiro_id) === confirmingId
                  )?.nome
                }
              </u>
              ?
            </strong>
          </p>
          <S.ModalButtons>
            <Button
              variant="outlined"
              onClick={() => setConfirmingId(null)}
              disabled={isApproving}
            >
              Cancelar
            </Button>
            <Button
              onClick={() =>
                confirmingId && handleApprove(confirmingId, reservationId!)
              }
              loading={isApproving}
              disabled={isApproving}
            >
              Aprovar
            </Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>
    </>
  )
}
