import React, { useContext, useEffect } from 'react'

import { categories } from '@/constants/categories'
import { motion } from 'framer-motion'

import { CreateAdContext } from '@/contexts/CreateAdContext'

import * as S from '@/styles/pages/anuncios/steps/step2'

type Step2Props = {
  setCanProceed: (canProceed: boolean) => void
}

const MotionTitle = motion(S.Title)
const MotionOption = motion(S.Option)

export default function Step2({ setCanProceed }: Step2Props) {
  const { formData, updateFormData } = useContext(CreateAdContext)!

  useEffect(() => {
    setCanProceed(!!formData.categoria)
  }, [formData.categoria, setCanProceed])

  const handleCategorySelect = (categoryId: string) => {
    updateFormData('categoria', categoryId)
  }

  return (
    <S.Container>
      <S.Wrapper>
        <MotionTitle
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Qual das seguintes opções descreve melhor a sua caravana?
        </MotionTitle>

        <S.OptionsContainer>
          {categories.map((category, index) => {
            const isSelected = formData.categoria === category.id

            return (
              <MotionOption
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                data-selected={isSelected}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  opacity: { delay: index * 0.05, duration: 0.3 },
                  y: { delay: index * 0.05, duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <category.icon size={40} />
                <S.OptionLabel>{category.label}</S.OptionLabel>
              </MotionOption>
            )
          })}
        </S.OptionsContainer>
      </S.Wrapper>
    </S.Container>
  )
}
