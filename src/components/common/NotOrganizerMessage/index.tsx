import React from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Button from '@/components/common/Button'
import * as S from './styles'
import Image from 'next/image'
import EspereImg from '@/assets/images/espere.png'

interface NotOrganizerMessageProps {
  onClick: () => void
}

export default function NotOrganizerMessage({
  onClick
}: NotOrganizerMessageProps) {
  const { data: session } = useSession()

  const isOrganizer =
    session?.user?.organizador &&
    session?.user?.razao_social &&
    session?.user?.cnpj

  if (isOrganizer) return null

  const animationVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } }
  }

  return (
    <S.Wrapper
      as={motion.div}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={animationVariants}
    >
      <S.Title>
        <p>Empresa não cadastrada</p>
      </S.Title>
      <S.ImageContainer
        src={EspereImg.src}
        width={400}
        height={400}
        priority
        alt="Imagem ilustrativa para cadastro de empresa"
      />

      <S.Text>
        Para anunciar no Excursionistas você precisa cadastrar a sua empresa.
      </S.Text>
      <Button onClick={onClick}>Cadastrar Empresa</Button>
    </S.Wrapper>
  )
}
