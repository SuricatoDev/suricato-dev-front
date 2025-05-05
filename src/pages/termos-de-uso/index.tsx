import React from 'react'

import heroTerms from '@/assets/images/hero-terms.jpg'
import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'

import useIsMobile from '@/hooks/useIsMobile'

import Button from '@/components/common/Button'
import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import MobileHeader from '@/components/sections/MobileHeader'

import * as S from '@/styles/pages/termos-e-politicas'

export const metadata = {
  title: 'Termos de Uso – Excursionistas',
  description: 'Última atualização: 03/05/2025'
}

export default function TermsOfUsePage() {
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()

  const contentY = useTransform(
    scrollY,
    [0, isMobile ? 100 : 400],
    ['0px', isMobile ? '-30px' : '80px']
  )
  const backgroundY = useTransform(scrollY, [0, 400], ['0', '50%'])

  return (
    <>
      <MobileHeader>Termos de Uso</MobileHeader>
      <S.Wrapper>
        <Head>
          <title>Termos de Uso – Excursionistas</title>
        </Head>

        <Header variant="simple" />

        <S.HeroSection>
          <S.BackgroundImage
            as={motion.div}
            style={{
              backgroundImage: `linear-gradient(
                rgba(0,0,0,0.6),
                rgba(0,0,0,0.9)
              ), url(${heroTerms.src})`,
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
              <h1>Termos de Uso</h1>
              <p>Regras e responsabilidades ao usar nossa plataforma.</p>
            </S.HeroContent>
          </motion.div>
          <S.WaveDivider />
        </S.HeroSection>

        <S.Main>
          <div className="container">
            <S.SpacingMobile>
              <S.TextBlock>
                <p style={{ margin: 0 }}>
                  <strong>Última atualização:</strong> 03/05/2025
                </p>
                <br />
                <p style={{ margin: 0 }}>
                  Estes Termos de Uso regem o acesso e uso da plataforma
                  <b> Excursionistas</b>, de titularidade da Excursionistas
                  Ltda., disponível em{' '}
                  <Link href="/">www.excursionistas.com</Link>. Ao utilizar o
                  site, você concorda com os termos descritos abaixo.
                </p>
              </S.TextBlock>

              <S.SectionsContainer>
                <S.TextBlock>
                  <h2>1. Descrição da plataforma</h2>
                  <p>
                    O Excursionistas é uma plataforma que conecta passageiros a
                    organizadores de caravanas destinadas a eventos culturais e
                    de negócios. A plataforma atua como intermediadora,
                    <b>
                      {' '}
                      não sendo responsável pelo transporte ou pela execução das
                      viagens.
                    </b>
                  </p>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>2. Cadastro de usuários</h2>
                  <p>
                    Para utilizar as funcionalidades da plataforma, o usuário
                    deve se cadastrar e fornecer informações <b>verdadeiras </b>
                    e <b>atualizadas. </b>O uso da conta é pessoal e
                    intransferível.
                  </p>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>3. Responsabilidades dos usuários</h2>
                  <ul>
                    <li>
                      <strong>Passageiros:</strong> devem verificar todas as
                      informações da caravana antes da reserva e manter
                      comunicação com o organizador;
                    </li>
                    <li>
                      <strong>Organizadores:</strong> são responsáveis por
                      fornecer informações claras, cumprir os compromissos com
                      os passageiros e atuar de forma legal e ética;
                    </li>
                    <li>
                      <strong>Ambos:</strong> devem manter conduta respeitosa e
                      cumprir as normas da plataforma.
                    </li>
                  </ul>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>4. Limitações de responsabilidade</h2>
                  <p>
                    O <b>Excursionistas não se responsabiliza</b> por:
                  </p>
                  <ul>
                    <li>Cancelamentos ou mudanças nas viagens;</li>
                    <li>Conflitos entre passageiros e organizadores;</li>
                    <li>
                      Qualquer prejuízo causado por informações falsas ou uso
                      indevido da plataforma.
                    </li>
                  </ul>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>5. Suspensão de contas</h2>
                  <p>
                    Reservamo-nos o direito de{' '}
                    <b>suspender ou cancelar contas</b> de usuários que violem
                    estes termos ou causem danos à comunidade da plataforma.
                  </p>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>6. Propriedade intelectual</h2>
                  <p>
                    Todo o conteúdo da plataforma, incluindo nome, marca, layout
                    e funcionalidades, é protegido por <b>direitos autorais </b>
                    e não pode ser utilizado sem autorização prévia.
                  </p>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>7. Alterações nos termos</h2>
                  <p>
                    Podemos modificar estes Termos a qualquer momento. As
                    alterações entrarão em vigor a partir da data de publicação
                    no site. O uso contínuo da plataforma implica concordância
                    com os novos termos.
                  </p>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>8. Foro</h2>
                  <p>
                    Fica eleito o foro da Comarca de Sorocaba/SP, com exclusão
                    de qualquer outro, por mais privilegiado que seja, para
                    dirimir quaisquer controvérsias oriundas destes Termos.
                  </p>
                </S.TextBlock>
              </S.SectionsContainer>

              <S.ContactSection>
                <Button href="/termos-de-uso.pdf" as="a" download>
                  Baixar PDF dos Termos de Uso
                </Button>
              </S.ContactSection>
            </S.SpacingMobile>
          </div>
        </S.Main>

        <Footer />
      </S.Wrapper>
    </>
  )
}
