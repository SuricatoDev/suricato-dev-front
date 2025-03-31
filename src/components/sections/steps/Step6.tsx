import React, { useEffect } from 'react'
import * as S from '@/styles/pages/anunciar/steps/step1'
import VanImg from '@/assets/images/parte-2.png'
import { motion } from 'framer-motion'

type Step6Props = {
  setCanProceed: (canProceed: boolean) => void
}

export default function Step6({ setCanProceed }: Step6Props) {
  useEffect(() => {
    setCanProceed(true)
  }, [])

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <S.Container>
      <S.StepImg
        as={motion.img}
        src={VanImg.src}
        width={720}
        height={720}
        alt=""
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />
      <S.StepInfo
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <S.StepNumber>Etapa 2</S.StepNumber>
        </motion.div>
        <motion.div variants={item}>
          <S.Title>Faça sua caravana se destacar</S.Title>
        </motion.div>
        <motion.div variants={item}>
          <S.Instructions>
            Nessa etapa, você adicionará informações sobre a sua caravana, além
            de 5 fotos ou mais. Depois, você deverá criar um título e uma
            descrição.
          </S.Instructions>
        </motion.div>
      </S.StepInfo>
    </S.Container>
  )
}
