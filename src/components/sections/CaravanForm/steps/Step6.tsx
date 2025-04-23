
import React, { useEffect } from 'react'

import VanImg from '@/assets/images/parte-2.png'
import { motion } from 'framer-motion'

import * as S from '@/styles/pages/anuncios/steps/step1'

type Step6Props = {
  setCanProceed: (canProceed: boolean) => void
}

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

const MotionStepImg = motion(S.StepImg)
const MotionStepInfo = motion(S.StepInfo)

export default function Step6({ setCanProceed }: Step6Props) {
  useEffect(() => {
    setCanProceed(true)
  }, [setCanProceed])

  return (
    <S.Container>
      <MotionStepImg
        src={VanImg.src}
        width={720}
        height={720}
        alt="Parte 2 da van"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />

      <MotionStepInfo variants={container} initial="hidden" animate="show">
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
      </MotionStepInfo>
    </S.Container>
  )
}
