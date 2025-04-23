import React, { useContext, useEffect } from 'react'

import { motion } from 'framer-motion'

import { CreateAdContext } from '@/contexts/CreateAdContext'

import { ImageDropzone } from '@/components/common/ImageDropzone'

import * as S from '@/styles/pages/anuncios/steps/step7'

type Step7Props = {
  setCanProceed: (canProceed: boolean) => void
}

const MotionHeading = motion(S.Heading)

export default function Step7({ setCanProceed }: Step7Props) {
  const { formData, updateFormData } = useContext(CreateAdContext)!

  useEffect(() => {
    setCanProceed(formData.imagens.length >= 5)
  }, [formData.imagens, setCanProceed])

  const handleFilesChange = (files: File[]) => {
    const items = files.map((file, index) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      order: index
    }))
    updateFormData('imagens', items)
  }

  return (
    <S.Container>
      <S.Wrapper>
        <MotionHeading
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <S.Title>Adicione algumas fotos da caravana e do evento</S.Title>
          <S.Description>
            Você precisará de cinco fotos para começar. Você pode adicionar
            outras imagens ou fazer alterações mais tarde.
          </S.Description>
        </MotionHeading>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ImageDropzone
            initialFiles={formData.imagens}
            onFilesChange={handleFilesChange}
          />
        </motion.div>
      </S.Wrapper>
    </S.Container>
  )
}
