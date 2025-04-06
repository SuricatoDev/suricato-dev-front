import React, { useContext, useEffect, useState } from 'react'
import * as S from '@/styles/pages/anuncios/steps/step12'
import { CreateAdContext } from '@/contexts/CreateAdContext'
import ErrorMessage from '@/components/common/ErrorMessage'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple'
import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown'
import { CaretUp } from '@phosphor-icons/react/dist/ssr/CaretUp'
import Divider from '@/components/common/Divider'
import { motion } from 'framer-motion'

export default function Step12({
  setCanProceed
}: {
  setCanProceed: (ok: boolean) => void
}) {
  const { formData, updateFormData } = useContext(CreateAdContext)!
  const [price, setPrice] = useState(formData.valor || 20)
  const [editing, setEditing] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [activeInner, setActiveInner] = useState<'guest' | 'host'>('guest')

  const min = 20
  const max = 9999

  const serviceFee = Math.round(price * 0.14)
  const totalGuestPays = price + serviceFee
  const hostReceives = price - Math.round(price * 0.03)

  const isValid = price >= min && price <= max

  useEffect(() => {
    updateFormData('valor', price)
    setCanProceed(isValid)
  }, [price])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setPrice(Number(value))
  }

  return (
    <S.Container>
      <S.Heading
        as={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <S.Title>Agora, determine seu preço</S.Title>
        <S.Description>Você pode alterá-lo quando quiser.</S.Description>
      </S.Heading>

      <S.Center
        as={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <S.PriceContainer>
          <S.PriceDisplay>
            {editing ? (
              <S.PriceInput
                value={price}
                onChange={handleChange}
                onBlur={() => setEditing(false)}
                autoFocus
              />
            ) : (
              <>
                <S.PriceText onClick={() => setEditing(true)}>
                  R${price.toLocaleString('pt-BR')}
                </S.PriceText>
                <S.EditButton onClick={() => setEditing(true)}>
                  <PencilSimple size={16} weight="fill" />
                </S.EditButton>
              </>
            )}
          </S.PriceDisplay>
          {!isValid && (
            <ErrorMessage
              withIcon
              $error="Insira um valor entre R$ 10 e R$ 9.999"
            />
          )}
        </S.PriceContainer>
        {!showDetails && (
          <S.GuestPriceSummary onClick={() => setShowDetails(true)}>
            Preço para o passageiro: R$
            {totalGuestPays.toLocaleString('pt-BR')} <CaretDown size={14} />
          </S.GuestPriceSummary>
        )}

        {showDetails && (
          <>
            <S.DetailsCard
              active={activeInner === 'guest'}
              onClick={() => setActiveInner('guest')}
            >
              {activeInner === 'guest' && (
                <>
                  <S.DetailsRow>
                    <span>Preço básico</span>
                    <span>R${price.toLocaleString('pt-BR')}</span>
                  </S.DetailsRow>
                  <S.DetailsRow>
                    <span>Taxa de serviço do passageiro</span>
                    <span>R${serviceFee.toLocaleString('pt-BR')}</span>
                  </S.DetailsRow>
                  <Divider $marginY="8px" />
                </>
              )}

              <S.DetailsRow bold>
                <span>Preço para o passageiro</span>
                <span>R${totalGuestPays.toLocaleString('pt-BR')}</span>
              </S.DetailsRow>
            </S.DetailsCard>

            <S.DetailsCard
              active={activeInner === 'host'}
              onClick={() => setActiveInner('host')}
            >
              {activeInner === 'host' && (
                <>
                  <S.DetailsRow>
                    <span>Preço básico</span>
                    <span>R${price.toLocaleString('pt-BR')}</span>
                  </S.DetailsRow>
                  <S.DetailsRow>
                    <span>Taxa de serviço do motorista</span>
                    <span>
                      -R${(price - hostReceives).toLocaleString('pt-BR')}
                    </span>
                  </S.DetailsRow>
                  <Divider $marginY="8px" />
                </>
              )}
              <S.DetailsRow bold>
                <span>Você recebe</span>
                <span>R${hostReceives.toLocaleString('pt-BR')} </span>
              </S.DetailsRow>
            </S.DetailsCard>

            <S.ToggleDetails onClick={() => setShowDetails(false)}>
              Mostrar menos <CaretUp size={14} />
            </S.ToggleDetails>
          </>
        )}
      </S.Center>
    </S.Container>
  )
}
