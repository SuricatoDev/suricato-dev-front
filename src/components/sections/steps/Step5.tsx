import React, { useContext, useEffect } from 'react'
import { CreateAdContext } from '@/contexts/CreateAdContext'
import * as S from '@/styles/pages/anunciar/steps/step5'
import { motion } from 'framer-motion'
import { Minus } from '@phosphor-icons/react/dist/ssr/Minus'
import { Plus } from '@phosphor-icons/react/dist/ssr/Plus'
import Divider from '@/components/common/Divider'

type Step5Props = { setCanProceed: (b: boolean) => void }

export default function Step5({ setCanProceed }: Step5Props) {
  const { formData, updateFormData } = useContext(CreateAdContext)!
  const { availableSeats, departureDateTime, arrivalDateTime } = formData

  useEffect(() => {
    setCanProceed(
      Number(availableSeats) > 0 &&
        Boolean(departureDateTime) &&
        Boolean(arrivalDateTime)
    )
  }, [availableSeats, departureDateTime, arrivalDateTime])

  const adjustSeats = (delta: number) =>
    updateFormData(
      'availableSeats',
      String(Math.max(1, Number(availableSeats || 0) + delta))
    )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateFormData(e.target.name as keyof typeof formData, e.target.value)

  return (
    <S.Container
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <S.Wrapper>
        <S.Title
          as={motion.h2}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Compartilhe algumas informações básicas sobre sua caravana
        </S.Title>

        <S.InputsContainer
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <S.Row>
            <S.Label>Vagas disponíveis</S.Label>
            <S.Counter>
              <S.CounterButton
                onClick={() => adjustSeats(-1)}
                disabled={Number(availableSeats) <= 1}
              >
                <Minus size={20} />
              </S.CounterButton>
              <S.CounterInput
                type="number"
                name="availableSeats"
                value={availableSeats || 0}
                min={1}
                onChange={handleChange}
              />
              <S.CounterButton onClick={() => adjustSeats(+1)}>
                <Plus size={20} />
              </S.CounterButton>
            </S.Counter>
          </S.Row>

          <Divider $marginY="16px" />

          <S.Row>
            <S.Label>Data e Hora de saída</S.Label>
            <S.DateTimeInput
              name="departureDateTime"
              value={departureDateTime}
              onChange={handleChange}
              step={1800}
              required
            />
          </S.Row>

          <Divider $marginY="16px" />

          <S.Row>
            <S.Label>Data e Hora de chegada</S.Label>
            <S.DateTimeInput
              name="arrivalDateTime"
              value={arrivalDateTime}
              onChange={handleChange}
              min={departureDateTime || undefined}
              step={1800}
              required
            />
          </S.Row>
        </S.InputsContainer>
      </S.Wrapper>
    </S.Container>
  )
}
