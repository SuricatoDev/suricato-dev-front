import heroRoad from '@/assets/images/hero-road.jpg'
import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'

import { Bus } from '@phosphor-icons/react/dist/ssr/Bus'
import { MapTrifold } from '@phosphor-icons/react/dist/ssr/MapTrifold'
import { UsersThree } from '@phosphor-icons/react/dist/ssr/UsersThree'

import useIsMobile from '@/hooks/useIsMobile'

import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import MobileHeader from '@/components/sections/MobileHeader'

import * as S from '@/styles/pages/sobre-nos'

export default function SobreNos() {
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()

  const contentY = useTransform(
    scrollY,
    [0, isMobile ? 100 : 300],
    ['0px', isMobile ? '-30px' : '-80px']
  )

  const backgroundY = useTransform(scrollY, [0, 300], ['0%', '20%'])

  return (
    <>
      <MobileHeader>Sobre nós</MobileHeader>
      <S.Wrapper>
        <Head>
          <title>Sobre Nós – Excursionistas</title>
        </Head>

        <Header variant="simple" />

        <S.HeroSection>
          <S.BackgroundImage
            as={motion.div}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${heroRoad.src})`,
              backgroundPositionY: backgroundY
            }}
          />

          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <S.HeroContent>
              <h1>Conectando Pessoas a Experiências</h1>
              <p>
                Conectar pessoas a experiências inesquecíveis. Esse é o nosso
                propósito.
              </p>
            </S.HeroContent>
          </motion.div>

          <S.WaveDivider />
        </S.HeroSection>

        <S.Main>
          <div className="container">
            <S.SectionsContainer>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <S.Section>
                  <div>
                    <S.IconWrapper>
                      <UsersThree size={48} weight="fill" />
                    </S.IconWrapper>
                    <S.TextBlock>
                      <h2>Quem Somos</h2>
                      <p>
                        O Excursionistas nasceu da vontade de transformar a
                        forma como brasileiros se locomovem para eventos
                        culturais e de negócios em outras cidades. Shows,
                        festivais, feiras, peças de teatro — sabemos o quanto
                        essas experiências marcam momentos únicos na vida das
                        pessoas. Mas também sabemos como pode ser difícil chegar
                        até elas.
                      </p>
                    </S.TextBlock>
                  </div>
                </S.Section>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <S.Section $alternate>
                  <div>
                    <S.IconWrapper>
                      <Bus size={48} weight="fill" />
                    </S.IconWrapper>
                    <S.TextBlock>
                      <h2>O que fazemos</h2>
                      <p>
                        Criamos uma plataforma inovadora que centraliza a oferta
                        de caravanas e facilita o acesso ao transporte para
                        eventos. Com poucos cliques, passageiros encontram
                        opções seguras, organizadas e confiáveis. Organizadores
                        de caravanas ganham um canal eficiente para divulgar
                        seus serviços, gerenciar reservas e preencher seus
                        veículos com muito mais facilidade.
                      </p>
                    </S.TextBlock>
                  </div>
                </S.Section>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <S.Section>
                  <div>
                    <S.IconWrapper>
                      <MapTrifold size={48} weight="fill" />
                    </S.IconWrapper>
                    <S.TextBlock>
                      <h2>Nosso Compromisso</h2>
                      <p>
                        Desde o lançamento, o Excursionistas já ajudou milhares
                        de pessoas a irem mais longe — com conforto, economia e
                        segurança. Nosso compromisso é com a mobilidade
                        inteligente e a valorização de cada momento. Afinal,
                        viver o evento começa na estrada.
                      </p>
                    </S.TextBlock>
                  </div>
                </S.Section>
              </motion.div>
            </S.SectionsContainer>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <S.ClosingBlock>
                <h2>Excursionistas</h2>
                <p>
                  Porque toda grande experiência merece um bom caminho até lá.
                </p>
              </S.ClosingBlock>
            </motion.div>
          </div>
        </S.Main>

        <Footer />
      </S.Wrapper>
    </>
  )
}
