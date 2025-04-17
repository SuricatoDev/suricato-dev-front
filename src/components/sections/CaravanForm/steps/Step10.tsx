import React, { useContext, useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { CreateAdContext } from '@/contexts/CreateAdContext'

import ErrorMessage from '@/components/common/ErrorMessage'

import * as S from '@/styles/pages/anuncios/steps/step9-10'

export default function Step10({
  setCanProceed
}: {
  setCanProceed: (ok: boolean) => void
}) {
  const { formData, updateFormData } = useContext(CreateAdContext)!
  const [description, setDescription] = useState(
    formData.descricao || 'Você jamais esquecerá dessa experiência.'
  )

  const maxLength = 500
  const isTooLong = description.length > maxLength
  const isEmpty = description.trim().length === 0
  const showError = isTooLong

  useEffect(() => {
    updateFormData('descricao', description)
    setCanProceed(!isEmpty && !isTooLong)
  }, [description])

  return (
    <S.Container>
      <S.Wrapper>
        <S.Heading
          as={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <S.Title>Crie sua descrição</S.Title>
          <S.Description>
            Explique o que sua caravana tem de especial.
          </S.Description>
        </S.Heading>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <S.Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            hasError={showError}
          />

          <S.CharCount>
            {description.length}/{maxLength}
          </S.CharCount>

          {showError && (
            <ErrorMessage
              withIcon
              $error={`O número máximo de caracteres permitido é ${maxLength}.`}
            />
          )}
        </motion.div>
      </S.Wrapper>
    </S.Container>
  )
}
