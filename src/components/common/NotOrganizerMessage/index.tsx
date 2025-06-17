import React from 'react'

import EspereImg from '@/assets/images/espere.png'
import { motion } from 'framer-motion'

import Button from '@/components/common/Button'

import * as S from './styles'

interface NotOrganizerMessageProps {
  onClick: () => void
}

export default function NotOrganizerMessage({
  onClick
}: NotOrganizerMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
    >
      <S.Wrapper>
        <S.Title>
          <p>Empresa não cadastrada</p>
        </S.Title>
        <S.ImageContainer
          src={EspereImg.src}
          width={400}
          height={400}
          priority
          alt="Empresa não cadastrada"
        />
        <S.Text>
          Para anunciar no Excursionistas você precisa cadastrar a sua empresa.
        </S.Text>
        <Button onClick={onClick}>Cadastrar Empresa</Button>
      </S.Wrapper>
    </motion.div>
  )
}
