import heroPrivacy from '@/assets/images/hero-privacy.jpg'
import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'

import useIsMobile from '@/hooks/useIsMobile'

import Button from '@/components/common/Button'
import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import MobileHeader from '@/components/sections/MobileHeader'

import * as S from '@/styles/pages/termos-e-politicas'

export const metadata = {
  title: 'Política de Privacidade – Excursionistas',
  description:
    'Nossa Política de Privacidade – última atualização em 02/05/2025'
}

export default function PrivacyPolicyPage() {
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()

  const contentY = useTransform(
    scrollY,
    [0, isMobile ? 100 : 400],
    ['0px', isMobile ? '-30px' : '80px']
  )
  const backgroundY = useTransform(
    scrollY,
    [0, 400],
    [isMobile ? '0%' : '10%', '50%']
  )

  return (
    <>
      <MobileHeader>Política de Privacidade</MobileHeader>
      <S.Wrapper>
        <Head>
          <title>Política de Privacidade – Excursionistas</title>
        </Head>

        <Header variant="simple" />

        <S.HeroSection>
          <S.BackgroundImage
            as={motion.div}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${heroPrivacy.src})`,
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
              <h1>Política de Privacidade</h1>
              <p>Entenda como coletamos, usamos e protegemos seus dados.</p>
            </S.HeroContent>
          </motion.div>
          <S.WaveDivider />
        </S.HeroSection>

        <S.Main>
          <div className="container">
            <S.SpacingMobile>
              <S.TextBlock>
                <p style={{ margin: 0 }}>
                  <strong>Última atualização:</strong> 02/05/2025
                </p>{' '}
                <br />
                <p style={{ margin: 0 }}>
                  A sua privacidade é importante para nós. Esta Política de
                  Privacidade explica como coletamos, usamos, armazenamos e
                  protegemos as suas informações ao utilizar a plataforma
                  <b> Excursionistas</b>.
                </p>
              </S.TextBlock>

              <S.SectionsContainer>
                <S.TextBlock>
                  <h2>1. Informações que coletamos</h2>
                  <p>
                    Coletamos dados pessoais fornecidos por você no momento do
                    cadastro e uso da plataforma, incluindo, mas não se
                    limitando a:
                  </p>
                  <ul>
                    <li>Nome completo;</li>
                    <li>CPF e/ou CNPJ;</li>
                    <li>Endereço;</li>
                    <li>E-mail e telefone;</li>
                    <li>Dados de navegação e uso do site.</li>
                  </ul>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>2. Como usamos seus dados</h2>
                  <p>Utilizamos suas informações para:</p>
                  <ul>
                    <li>Criar e gerenciar sua conta;</li>
                    <li>Conectar passageiros e organizadores de caravanas;</li>
                    <li>Melhorar a experiência na plataforma;</li>
                    <li>Realizar validações de segurança;</li>
                    <li>
                      Enviar notificações e comunicações relacionadas ao uso do
                      sistema.
                    </li>
                  </ul>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>3. Compartilhamento de informações</h2>
                  <p>
                    Não vendemos nem compartilhamos seus dados com terceiros,
                    exceto quando necessário para:
                  </p>
                  <ul>
                    <li>Cumprimento de obrigações legais;</li>
                    <li>Prestação dos serviços contratados na plataforma;</li>
                    <li>
                      Proteção dos direitos da plataforma ou de seus usuários.
                    </li>
                  </ul>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>4. Segurança das informações</h2>
                  <p>
                    Utilizamos medidas técnicas e administrativas para proteger
                    seus dados contra acessos não autorizados, alterações,
                    divulgações ou destruições.
                  </p>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>5. Seus direitos</h2>
                  <p>Você pode, a qualquer momento:</p>
                  <ul>
                    <li>Acesso aos seus dados;</li>
                    <li>Correção de informações;</li>
                    <li>
                      Exclusão da sua conta e dos dados pessoais, salvo
                      obrigações legais.
                    </li>
                  </ul>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>6. Alterações nesta política</h2>
                  <p>
                    Podemos atualizar esta política periodicamente. Em caso de
                    mudanças relevantes, notificaremos os usuários através dos
                    canais cadastrados.
                  </p>
                </S.TextBlock>

                <S.TextBlock>
                  <h2>7. Fale conosco</h2>
                  <p>
                    Para dúvidas ou solicitações sobre esta Política de
                    Privacidade, entre em contato pelo e-mail:{' '}
                    <a href="mailto:contato@excursionistas.com">
                      contato@excursionistas.com
                    </a>
                  </p>
                </S.TextBlock>
              </S.SectionsContainer>

              <S.ContactSection>
                <Button href="/politica-de-privacidade.pdf" as="a" download>
                  Baixar PDF da Política de Privacidade
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
