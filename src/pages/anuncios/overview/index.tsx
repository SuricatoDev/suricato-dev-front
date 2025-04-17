import { useEffect, useState } from 'react'

import { GetServerSideProps } from 'next'

import likeIcon from '@/assets/icons/like-3d.png'
import mapPinIcon from '@/assets/icons/map-pin-3d.png'
import pictureIcon from '@/assets/icons/picture-3d.png'
import { motion } from 'framer-motion'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useIsOrganizer } from '@/hooks/useIsOrganizer'
import useMediaQuery from '@/hooks/useMediaQuery'

import Button from '@/components/common/Button'
import Divider from '@/components/common/Divider'
import HeaderNav from '@/components/sections/HeaderNav'

import * as S from '@/styles/pages/anuncios/overview'

export default function Overview() {
  const isMobile = useMediaQuery()
  const router = useRouter()
  const { isOrganizer, loading } = useIsOrganizer()

  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (!isOrganizer && !loading) {
      router.push('/anuncios')
    }
  }, [isOrganizer, loading, router])

  const handleStart = () => {
    setIsExiting(true)
    setTimeout(() => {
      router.push('/anuncios/novo')
    }, 500)
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  if (!isOrganizer) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>Crie seu anúncio - Excursionistas</title>
      </Head>
      <HeaderNav showDoubtsButton={false} />

      <S.Container>
        <S.TitleContainer
          as={motion.div}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <S.Title>É muito fácil anunciar no Excursionistas</S.Title>
        </S.TitleContainer>
        <S.InfoContainer
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <S.InfoItem>
              <S.InfoNumber>1</S.InfoNumber>
              <S.InfoText>
                <S.InfoTitle>Descreva sua caravana</S.InfoTitle>
                <S.InfoDescription>
                  Compartilhe algumas informações básicas, como a localização do
                  ponto de partida, o destino e quantos passageiros podem
                  participar.
                </S.InfoDescription>
              </S.InfoText>
              <S.InfoIcon src={mapPinIcon.src} width={76} height={76} alt="" />
            </S.InfoItem>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Divider $marginY={isMobile ? '40px' : '32px'} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <S.InfoItem>
              <S.InfoNumber>2</S.InfoNumber>
              <S.InfoText>
                <S.InfoTitle>Faça com que se destaque</S.InfoTitle>
                <S.InfoDescription>
                  Adicione cinco fotos ou mais, além de um título e uma
                  descrição. Nós ajudaremos você.
                </S.InfoDescription>
              </S.InfoText>
              <S.InfoIcon src={pictureIcon.src} width={76} height={76} alt="" />
            </S.InfoItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Divider $marginY={isMobile ? '40px' : '32px'} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <S.InfoItem>
              <S.InfoNumber>3</S.InfoNumber>
              <S.InfoText>
                <S.InfoTitle>Concluir e publicar</S.InfoTitle>
                <S.InfoDescription>
                  Escolha um preço inicial, verifique algumas informações e
                  publique seu anúncio.
                </S.InfoDescription>
              </S.InfoText>
              <S.InfoIcon src={likeIcon.src} width={120} height={120} alt="" />
            </S.InfoItem>
          </motion.div>
        </S.InfoContainer>
      </S.Container>

      <S.Footer>
        <Button fullWidth={isMobile} onClick={handleStart}>
          Começar
        </Button>
      </S.Footer>
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session }
  }
}
