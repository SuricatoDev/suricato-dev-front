import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'

import Button from '@/components/common/Button'
import ListModal from '@/components/common/ListModal'
import Modal from '@/components/common/Modal'

import * as S from './styles'

export interface Reservation {
  id: string
  userName: string
  status: 'pending' | 'approved'
}

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
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [isApproving, setIsApproving] = useState(false)

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

    const mock: Reservation[] = names.map((userName, i) => ({
      id: String(i),
      userName,
      status: Math.round(Math.random()) === 0 ? 'pending' : 'approved'
    }))

    setReservations(mock)
  }, [isOpen, caravanId])

  const handleApprove = async (id: string) => {
    setIsApproving(true)
    try {
      await axios.put(`/api/caravanas/${caravanId}/reservas/${id}/aprovar`)
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
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
              <S.Name>{r.userName}</S.Name>
            </div>
            <Button
              size="sm"
              disabled={r.status === 'approved'}
              onClick={() => r.status === 'pending' && setConfirmingId(r.id)}
            >
              Aprovar
            </Button>
          </>
        )}
      />

      <Modal
        $isOpen={confirmingId !== null}
        onClose={() => setConfirmingId(null)}
        closeButton={false}
      >
        <S.ModalContent>
          <h3>Confirmar aprovação</h3>
          <p>
            Essa ação é irreversível. Deseja realmente aprovar o(a)
            passageiro(a):
            <strong>
              <u>{reservations.find((r) => r.id === confirmingId)?.userName}</u>
              <span>?</span>
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
              onClick={() => confirmingId && handleApprove(confirmingId)}
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
