import React, { useContext, useEffect } from 'react'
import { CreateAdContext } from '@/contexts/CreateAdContext'
import * as S from '@/styles/pages/anunciar/steps/step7'
import { motion } from 'framer-motion'
import { ImageDropzone } from '@/components/common/ImageDropzone'

type Step7Props = {
  setCanProceed: (canProceed: boolean) => void
}

export default function Step7({ setCanProceed }: Step7Props) {
  const { formData, updateFormData } = useContext(CreateAdContext)!

  useEffect(() => {
    setCanProceed(formData.images.length >= 5)
  }, [formData.images, setCanProceed])

  return (
    <S.Container>
      <S.Wrapper>
        <S.Heading>
          <S.Title
            as={motion.h2}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Adicione algumas fotos da caravana e do evento
          </S.Title>
          <S.Description>
            Você precisará de cinco fotos para começar. Você pode adicionar
            outras imagens ou fazer alterações mais tarde.
          </S.Description>
        </S.Heading>

        <ImageDropzone
          onFilesChange={(files) => updateFormData('images', files)}
        />
      </S.Wrapper>
    </S.Container>
  )
}
