import React, { useEffect, useState } from 'react'

import Button from '@/components/common/Button'
import ListModal from '@/components/common/ListModal'

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

export default function ReservationConfirmationModal({
  caravanId,
  caravanTitle,
  isOpen,
  onClose
}: ReservationConfirmationModalProps) {
  const [reservations, setReservations] = useState<Reservation[]>([])

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

    const mockApiResponse = names.map((passageiro_nome, i) => ({
      id: i,
      caravana_id: 0,
      passageiro_id: i,
      status: i < 10 ? 'pendente' : 'aprovado',
      passageiro_nome
    }))

    const mapped: Reservation[] = mockApiResponse.map<Reservation>((item) => ({
      id: String(item.id),
      userName: item.passageiro_nome,
      status: item.status === 'pendente' ? 'pending' : 'approved'
    }))

    setReservations(mapped)
  }, [isOpen, caravanId])

  const handleApprove = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    )
  }

  return (
    <ListModal<Reservation>
      $isOpen={isOpen}
      onClose={onClose}
      closeButton
      title={`${caravanTitle} – Reservas`}
      subtitle="Confira a lista de passageiros aguardando aprovação:"
      items={reservations}
      withPagination={true}
      itemsPerPageOptions={10}
      renderItem={(r) => (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <S.Dot status={r.status} />
            <S.Name>{r.userName}</S.Name>
          </div>
          <Button
            size="sm"
            disabled={r.status === 'approved'}
            onClick={() => handleApprove(r.id)}
          >
            Aprovar
          </Button>
        </>
      )}
    />
  )
}
