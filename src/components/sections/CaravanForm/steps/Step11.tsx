import React, { useEffect } from 'react'

import Part3 from '@/assets/images/parte-3.png'
import { motion } from 'framer-motion'

import * as S from '@/styles/pages/anuncios/steps/step1'

type Step7Props = {
  setCanProceed: (canProceed: boolean) => void
}

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.3
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

const MotionStepImg = motion(S.StepImg)
const MotionStepInfo = motion(S.StepInfo)

export default function Step11({ setCanProceed }: Step7Props) {
  useEffect(() => {
    setCanProceed(true)
  }, [])

  return (
    <S.Container>
      <MotionStepImg
        src={Part3.src}
        width={720}
        height={720}
        alt=""
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <MotionStepInfo variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <S.StepNumber>Etapa 3</S.StepNumber>
        </motion.div>
        <motion.div variants={item}>
          <S.Title>Conclua e publique</S.Title>
        </motion.div>
        <motion.div variants={item}>
          <S.Instructions>
            Por fim, você poderá configurar os preços e publicar seu anúncio.
          </S.Instructions>
        </motion.div>
      </MotionStepInfo>
    </S.Container>
  )
}
