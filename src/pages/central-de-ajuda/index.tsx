import { useState } from 'react'

import { GetServerSidePropsContext } from 'next'

import heroFaq from '@/assets/images/hero-faq.jpg'
import axios, { AxiosError } from 'axios'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { toast } from 'react-toastify'

import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown'

import useIsMobile from '@/hooks/useIsMobile'

import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import Input from '@/components/inputs/Input'
import Textarea from '@/components/inputs/TextArea'
import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import MobileHeader from '@/components/sections/MobileHeader'

import * as S from '@/styles/pages/central-de-ajuda'

interface FAQPageProps {
  isAuthenticated: boolean
}

const faqData = [
  {
    question: 'O que é o Excursionistas?',
    answer:
      'O Excursionistas é uma plataforma que conecta passageiros a organizadores de caravanas para eventos culturais e de negócios em outras cidades. Facilitamos a busca, reserva e divulgação de transporte para shows, feiras, festivais e muito mais.'
  },
  {
    question: 'O Excursionistas é uma empresa de transporte?',
    answer:
      'Não. Nós não realizamos o transporte diretamente. Atuamos como intermediários, oferecendo um espaço para que organizadores divulguem suas caravanas e passageiros encontrem opções seguras e confiáveis.'
  },
  {
    question: 'Preciso me cadastrar para usar o site?',
    answer:
      'Sim. Tanto passageiros quanto organizadores precisam criar uma conta para acessar as funcionalidades da plataforma, como reservar uma vaga ou cadastrar uma caravana.'
  },
  {
    question: 'É gratuito usar o Excursionistas?',
    answer:
      'Sim! O cadastro e a utilização básica da plataforma são gratuitos tanto para passageiros quanto para organizadores. Futuramente, funcionalidades adicionais ou planos premium podem ser disponibilizados.'
  },
  {
    question: 'Como encontro caravanas disponíveis?',
    answer:
      'Você pode usar a barra de busca e os filtros por cidade de origem, destino, data e tipo de evento para encontrar a caravana ideal.'
  },
  {
    question: 'Quem pode anunciar caravanas?',
    answer:
      'Tanto empresas quanto pessoas físicas que oferecem transporte legalizado podem divulgar caravanas na plataforma, desde que forneçam as informações exigidas e passem pelas validações de segurança.'
  },
  {
    question: 'Como faço para cadastrar uma nova caravana?',
    answer:
      'Após criar sua conta como organizador, acesse o painel do usuário e clique em “Nova caravana”. Preencha os dados da viagem, como destino, horário de saída, valor por vaga e informações de contato.'
  },
  {
    question: 'Como o Excursionistas garante a segurança dos usuários?',
    answer:
      'Todos os usuários passam por validação de dados como CPF, CNPJ e CEP. Além disso, temos um sistema de avaliações que ajuda a construir a reputação de organizadores e passageiros.'
  },
  {
    question: 'Posso avaliar um organizador ou uma viagem?',
    answer:
      'Sim! Após a conclusão da viagem, você poderá avaliar sua experiência, ajudando outros usuários a fazerem escolhas mais seguras.'
  },
  {
    question: 'E se eu tiver um problema com a viagem?',
    answer:
      'Você pode entrar em contato com o suporte pelo e-mail ou formulário de atendimento disponível na plataforma. Faremos o possível para ajudar.'
  },
  {
    question: 'A plataforma oferece suporte ao cliente?',
    answer:
      'Sim! Nosso suporte está disponível em horário comercial para auxiliar com dúvidas, sugestões e eventuais problemas com reservas.'
  }
]

export default function FaqPage({ isAuthenticated }: FAQPageProps) {
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)

  const contentY = useTransform(
    scrollY,
    [0, isMobile ? 100 : 300],
    ['0px', isMobile ? '-30px' : '80px']
  )
  const backgroundY = useTransform(
    scrollY,
    [0, 300],
    [isMobile ? '0%' : '30%', '50%']
  )

  const toggleOpen = (question: string) => {
    setOpenItem((prev) => (prev === question ? null : question))
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({ title: '', description: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description) {
      toast.error('Preencha todos os campos.')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('/api/suporte', {
        titulo: formData.title,
        descricao: formData.description
      })

      toast.success(response.data.message ?? 'Dúvida enviada com sucesso!')
      handleCloseModal()
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>
      toast.error(error.response?.data.message ?? 'Erro ao enviar sua dúvida.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MobileHeader>Central de Ajuda</MobileHeader>
      <S.Wrapper>
        <Head>
          <title>Central de Ajuda – Excursionistas</title>
        </Head>

        <Header variant="simple" />

        <S.HeroSection>
          <S.BackgroundImage
            as={motion.div}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${heroFaq.src})`,
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
              <h1>Central de Ajuda</h1>
              <p>Esclareça suas dúvidas e viaje com segurança.</p>
            </S.HeroContent>
          </motion.div>
          <S.WaveDivider />
        </S.HeroSection>

        <S.Main>
          <div className="container">
            <S.SpacingMobile>
              <S.Heading>
                <S.Title>Perguntas Frequentes</S.Title>
                <S.Subtitle>
                  Alguma dúvida? Confira as respostas para as principais
                  perguntas sobre o tema ou{' '}
                  <a href="#fale-conosco">fale conosco</a>.
                </S.Subtitle>
              </S.Heading>

              <S.SectionsContainer>
                {faqData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <S.AccordionItem onClick={() => toggleOpen(item.question)}>
                      <S.QuestionButton>
                        <span>{item.question}</span>
                        <motion.div
                          animate={{
                            rotate: openItem === item.question ? 180 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <CaretDown weight="bold" size={20} />
                        </motion.div>
                      </S.QuestionButton>

                      <AnimatePresence initial={false}>
                        {openItem === item.question && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <S.Answer>{item.answer}</S.Answer>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </S.AccordionItem>
                  </motion.div>
                ))}
              </S.SectionsContainer>

              {isAuthenticated && (
                <S.ContactSection id="fale-conosco">
                  <S.ContactTitle>
                    Ainda não encontrou a resposta?
                  </S.ContactTitle>
                  <Button onClick={handleOpenModal}>Fale conosco</Button>
                </S.ContactSection>
              )}

              <Modal
                withMaxSizes={false}
                style={{ maxWidth: '600px', width: 'calc(100% - 2rem)' }}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              >
                <S.FormWrapper onSubmit={handleSubmit}>
                  <S.FormGroup>
                    <S.ModalTitle>Nos envie sua dúvida</S.ModalTitle>
                    <Input
                      label="Título da dúvida"
                      placeholder="Digite um título para sua dúvida"
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </S.FormGroup>

                  <S.FormGroup>
                    <Textarea
                      label="Descreva a sua dúvida"
                      placeholder="Digite sua dúvida aqui"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={8}
                    />
                  </S.FormGroup>

                  <Button type="submit" loading={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                  </Button>
                </S.FormWrapper>
              </Modal>
            </S.SpacingMobile>
          </div>
        </S.Main>

        <Footer />
      </S.Wrapper>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  return {
    props: {
      isAuthenticated: !!session
    }
  }
}
