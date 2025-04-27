export interface Reservation {
  passageiro_id: number
  reserva_id: number
  nome: string
  status: 'Pendente' | 'Confirmado' | 'Cancelado'
  rating?: number
}
