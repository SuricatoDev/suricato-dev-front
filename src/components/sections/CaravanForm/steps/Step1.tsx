import React from 'react'
import * as S from '@/styles/pages/anuncios/steps/step1'
import VanImg from '@/assets/images/van-editada.png'
import { motion } from 'framer-motion'

export default function Step1() {
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
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <S.StepInfo
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <S.StepNumber>Etapa 1</S.StepNumber>
        </motion.div>
        <motion.div variants={item}>
          <S.Title>Descreva sua caravana</S.Title>
        </motion.div>
        <motion.div variants={item}>
          <S.Instructions>
            Nesta etapa, vamos perguntar o tipo de caravana que você quer
            anunciar. Depois, você adiciona a origem, o destino e algumas
            informações como data, horário e número de vagas.
          </S.Instructions>
        </motion.div>
      </S.StepInfo>
    </S.Container>
  )
}
