import React, { useContext, useEffect, useState } from 'react'

import { motion } from 'framer-motion'



import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple'

import { CreateAdContext } from '@/contexts/CreateAdContext'


import ErrorMessage from '@/components/common/ErrorMessage'

import * as S from '@/styles/pages/anuncios/steps/step12'

const MotionCenter = motion(S.Center)
const MotionHeading = motion(S.Heading)

export default function Step12({
  setCanProceed
}: {
  setCanProceed: (ok: boolean) => void
}) {
  const { formData, updateFormData } = useContext(CreateAdContext)!
  const [price, setPrice] = useState(formData.valor || 20)
  const [editing, setEditing] = useState(false)
  
  

  const min = 20
  const max = 9999

  
  
  

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
      <MotionHeading
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <S.Title>Agora, determine seu preço</S.Title>
        <S.Description>Você pode alterá-lo quando quiser.</S.Description>
      </MotionHeading>

      <MotionCenter
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
        {}
      </MotionCenter>
    </S.Container>
  )
}
