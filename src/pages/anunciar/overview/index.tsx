import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import * as S from '@/styles/pages/anunciar/overview'
import HeaderNav from '@/components/sections/HeaderNav'
import Divider from '@/components/common/Divider'
import mapPinIcon from '@/assets/icons/map-pin-3d.png'
import pictureIcon from '@/assets/icons/picture-3d.png'
import likeIcon from '@/assets/icons/like-3d.png'
import Button from '@/components/common/Button'
import useMediaQuery from '@/hooks/useMediaQuery'
import Head from 'next/head'

export default function Overview() {
  const isMobile = useMediaQuery()
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    setIsExiting(true)
    setTimeout(() => {
      router.push('/anunciar')
    }, 500)
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
        <S.TitleContainer>
          <S.Title>É muito fácil anunciar no Excursionistas</S.Title>
        </S.TitleContainer>
        <S.InfoContainer>
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

          <Divider $marginY={isMobile ? '40px' : '32px'} />

          <S.InfoItem>
            <S.InfoNumber>2</S.InfoNumber>
            <S.InfoText>
              <S.InfoTitle>Faça com que se destaque</S.InfoTitle>
              <S.InfoDescription>
                Adicione cinco fotos ou mais, além de um título e uma descrição.
                Nós ajudaremos você.
              </S.InfoDescription>
            </S.InfoText>
            <S.InfoIcon src={pictureIcon.src} width={76} height={76} alt="" />
          </S.InfoItem>

          <Divider $marginY={isMobile ? '40px' : '32px'} />

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
