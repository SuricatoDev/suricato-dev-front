import React, { useContext, useEffect, useState } from 'react'
import * as S from '@/styles/pages/anunciar/steps/step9-10'
import { CreateAdContext } from '@/contexts/CreateAdContext'
import ErrorMessage from '@/components/common/ErrorMessage'
import { motion } from 'framer-motion'

export default function Step9({
  setCanProceed
}: {
  setCanProceed: (ok: boolean) => void
}) {
  const { formData, updateFormData } = useContext(CreateAdContext)!
  const [title, setTitle] = useState(formData.titulo)

  const maxLength = 32
  const isTooLong = title.length > maxLength
  const isEmpty = title.trim().length === 0
  const showError = isTooLong

  useEffect(() => {
    updateFormData('titulo', title)
    setCanProceed(!isEmpty && !isTooLong)
  }, [title])

  return (
    <S.Container>
      <S.Wrapper>
        <S.Heading
          as={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <S.Title>Agora, vamos dar um título à sua caravana</S.Title>
          <S.Description>
            Títulos curtos funcionam melhor. Não se preocupe, você poderá fazer
            alterações depois.
          </S.Description>
        </S.Heading>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <S.Textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
            hasError={showError}
          />

          <S.CharCount>
            {title.length}/{maxLength}
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
