import React, { useContext, useEffect } from 'react'
import { CreateAdContext } from '@/contexts/CreateAdContext'
import * as S from '@/styles/pages/anuncios/steps/step2'
import { categories } from '@/constants/categories'
import { motion } from 'framer-motion'

type Step2Props = {
  setCanProceed: (canProceed: boolean) => void
}

export default function Step2({ setCanProceed }: Step2Props) {
  const { formData, updateFormData } = useContext(CreateAdContext)!

  useEffect(() => {
    setCanProceed(!!formData.categoria)
  }, [formData.categoria])

  const handleCategorySelect = (categoryId: string) => {
    updateFormData('categoria', categoryId)
  }

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title
          as={motion.h2}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Qual das seguintes opções descreve melhor a sua caravana?
        </S.Title>

        <S.OptionsContainer>
          {categories.map((category, index) => {
            const isSelected = formData.categoria === category.id

            return (
              <S.Option
                as={motion.div}
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
              </S.Option>
            )
          })}
        </S.OptionsContainer>
      </S.Wrapper>
    </S.Container>
  )
}
