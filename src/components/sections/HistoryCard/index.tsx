// components/common/HistoryCard.tsx
import React, { useState } from 'react'

import { Caravan } from '@/interfaces/caravan'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'styled-components'

import {
  ArrowsLeftRight,
  CalendarDots,
  CaretDown,
  CaretUp,
  MapPin,
  Star
} from '@phosphor-icons/react'
import { Circle } from '@phosphor-icons/react/dist/ssr'

import Button from '@/components/common/Button'
import Divider from '@/components/common/Divider'
import Modal from '@/components/common/Modal'

import * as S from './styles'

export type HistoryCardProps = {
  caravan: Caravan & { status: 'Pendente' | 'Confirmado' | 'Cancelado' }
  enableActionsButtons?: boolean
  onCancel?: (id: number) => Promise<void>
  isCancelling?: boolean
  onRate?: (rating: number) => Promise<void>
  isRating?: boolean
}

export default function HistoryCard({
  caravan,
  onCancel,
  onRate,
  enableActionsButtons,
  isCancelling,
  isRating
}: HistoryCardProps) {
  const [openCard, setOpenCard] = useState(false)
  const [confirmingCancel, setConfirmingCancel] = useState(false)
  const [ratingModal, setRatingModal] = useState(false)
  const [hoverStar, setHoverStar] = useState<number>(0)
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const theme = useTheme()

  const {
    id,
    titulo,
    data_partida,
    data_retorno,
    endereco_origem,
    complemento_origem,
    numero_origem,
    bairro_origem,
    cidade_origem,
    estado_origem,
    endereco_destino,
    complemento_destino,
    numero_destino,
    bairro_destino,
    cidade_destino,
    estado_destino,
    status
  } = caravan

  const dtPartida = new Date(data_partida)
  const dtRetorno = new Date(data_retorno)

  const fmtDate = (d: Date) =>
    d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  const fmtTime = (d: Date) =>
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const fullOrigin = `${endereco_origem}, ${numero_origem}${
    complemento_origem ? `, ${complemento_origem}` : ''
  }, ${bairro_origem} - ${cidade_origem}/${estado_origem}`
  const fullDestination = `${endereco_destino}, ${numero_destino}${
    complemento_destino ? `, ${complemento_destino}` : ''
  }, ${bairro_destino} - ${cidade_destino}/${estado_destino}`

  const handleConfirmCancel = async () => {
    if (onCancel) {
      await onCancel(Number(caravan.id))
      setConfirmingCancel(false)
    }
  }

  const handleConfirmRating = async () => {
    if (onRate) {
      await onRate(selectedRating)
      setRatingModal(false)
    }
  }

  return (
    <>
      <S.CardContainer>
        <S.CardTitle onClick={() => setOpenCard((o) => !o)} role="button">
          {titulo}
          <S.ToggleIcon>
            {openCard ? <CaretUp size={20} /> : <CaretDown size={20} />}
          </S.ToggleIcon>
        </S.CardTitle>

        <S.CardHeader onClick={() => setOpenCard((o) => !o)}>
          <S.SummaryField className="field-orig">
            <MapPin size={20} />
            <S.SummaryContent>
              <S.Label>origem</S.Label>
              <S.Value>{`${cidade_origem} - ${estado_origem}`}</S.Value>
            </S.SummaryContent>
          </S.SummaryField>

          <ArrowsLeftRight className="icon" size={24} />

          <S.SummaryField className="field-dest">
            <MapPin size={20} weight="fill" />
            <S.SummaryContent>
              <S.Label>destino</S.Label>
              <S.Value>{`${cidade_destino} - ${estado_destino}`}</S.Value>
            </S.SummaryContent>
          </S.SummaryField>

          <S.SummaryField className="field-date">
            <CalendarDots size={20} />
            <S.SummaryContent>
              <S.Label>data</S.Label>
              <S.Value>{fmtDate(dtPartida)}</S.Value>
            </S.SummaryContent>
          </S.SummaryField>

          <S.SummaryField className="status-field">
            <div
              style={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center'
              }}
            >
              <Circle
                size={12}
                weight="fill"
                style={{ marginBottom: '2.5px' }}
                color={
                  status === 'Confirmado'
                    ? theme.colors.alert_success
                    : status === 'Pendente'
                      ? theme.colors.alert_warning
                      : theme.colors.alert_error
                }
              />

              <S.SummaryContent>
                <S.Label>Situação</S.Label>
                <S.Value
                  style={{
                    color:
                      status === 'Confirmado'
                        ? theme.colors.alert_success
                        : status === 'Pendente'
                          ? theme.colors.alert_warning
                          : theme.colors.alert_error
                  }}
                >
                  {status}
                </S.Value>
              </S.SummaryContent>
            </div>
          </S.SummaryField>
        </S.CardHeader>

        <AnimatePresence initial={false}>
          {openCard && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Divider />
              <S.MoreDetailsContainer>
                <S.CardDetails>
                  <S.SummaryField>
                    <MapPin size={20} />
                    <S.SummaryContent>
                      <S.Label>partida</S.Label>
                      <S.Value>
                        {fmtDate(dtPartida)} às {fmtTime(dtPartida)}
                      </S.Value>
                    </S.SummaryContent>
                  </S.SummaryField>
                  <S.SummaryField>
                    <CalendarDots size={20} weight="fill" />
                    <S.SummaryContent>
                      <S.Label>retorno</S.Label>
                      <S.Value>
                        {fmtDate(dtRetorno)} às {fmtTime(dtRetorno)}
                      </S.Value>
                    </S.SummaryContent>
                  </S.SummaryField>
                  <S.SummaryField>
                    <MapPin size={20} />
                    <S.SummaryContent>
                      <S.Label>endereço origem</S.Label>
                      <S.Value>{fullOrigin}</S.Value>
                    </S.SummaryContent>
                  </S.SummaryField>
                  <S.SummaryField>
                    <MapPin weight="fill" size={20} />
                    <S.SummaryContent>
                      <S.Label>endereço destino</S.Label>
                      <S.Value>{fullDestination}</S.Value>
                    </S.SummaryContent>
                  </S.SummaryField>
                </S.CardDetails>

                <S.ActionsContainer>
                  <h3>Ações disponíveis:</h3>
                  <div className="divider">
                    <Divider $marginY="1rem" />
                  </div>
                  <S.ActionItems>
                    {enableActionsButtons ? (
                      <>
                        <Button
                          variant="outlined"
                          href={`/caravana/${id}`}
                          fullWidth
                        >
                          Ver caravana
                        </Button>
                        <Button
                          variant="danger"
                          fullWidth
                          onClick={() => setConfirmingCancel(true)}
                          disabled={status === 'Cancelado'}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button fullWidth onClick={() => setRatingModal(true)}>
                        Avaliar organizador
                      </Button>
                    )}
                  </S.ActionItems>
                </S.ActionsContainer>
              </S.MoreDetailsContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </S.CardContainer>

      {/* confirmação de cancelamento */}
      <Modal
        $isOpen={confirmingCancel}
        onClose={() => setConfirmingCancel(false)}
        closeButton={false}
      >
        <S.ModalContent>
          <h3>Confirmar cancelamento</h3>
          <p>
            Essa ação é irreversível. Deseja realmente cancelar a reserva da
            caravana
            <strong>
              <u>{titulo}</u>?
            </strong>
          </p>
          <S.ModalButtons>
            <Button
              variant="outlined"
              disabled={isCancelling}
              onClick={() => setConfirmingCancel(false)}
            >
              Voltar
            </Button>
            <Button
              variant="danger"
              fullWidth
              onClick={handleConfirmCancel}
              loading={isCancelling}
              disabled={isCancelling}
            >
              {isCancelling ? 'Cancelando...' : 'Confirmar'}
            </Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>

      <Modal
        $isOpen={ratingModal}
        onClose={() => setRatingModal(false)}
        closeButton={false}
      >
        <S.ModalContent>
          <h3>Avaliar organizador</h3>

          <S.Stars>
            {[1, 2, 3, 4, 5].map((n) => (
              <S.StarButton
                key={n}
                onClick={() => setSelectedRating(n)}
                onMouseEnter={() => setHoverStar(n)}
                onMouseLeave={() => setHoverStar(0)}
              >
                <Star
                  size={24}
                  weight={
                    n <= (hoverStar || selectedRating) ? 'fill' : 'regular'
                  }
                />
              </S.StarButton>
            ))}
          </S.Stars>

          <p>
            Esta avaliação é definitiva e não pode ser alterada depois. Deseja
            confirmar sua nota?
          </p>

          <S.ModalButtons>
            <Button
              fullWidth
              variant="outlined"
              disabled={isRating}
              onClick={() => setRatingModal(false)}
            >
              Cancelar
            </Button>
            <Button
              fullWidth
              onClick={handleConfirmRating}
              disabled={selectedRating === 0 || isRating}
              loading={isRating}
            >
              Confirmar
            </Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>
    </>
  )
}
