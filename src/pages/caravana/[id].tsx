import { useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'

import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr/CalendarBlank'
import { CheckCircle } from '@phosphor-icons/react/dist/ssr/CheckCircle'
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr/ShieldCheck'
import { CalendarDots } from '@phosphor-icons/react/dist/ssr/CalendarDots'
import { Clock } from '@phosphor-icons/react/dist/ssr/Clock'
import { Ticket } from '@phosphor-icons/react/dist/ssr/Ticket'

import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import MultiStepForm from '@/components/sections/LoginForm'
import Gallery from '@/components/common/Gallery'
import Divider from '@/components/common/Divider'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import Portal from '@/components/common/Portal'
import GatedContent from '@/components/common/GatedContent'
import MapEmbed from '@/components/common/MapEmbed'
import RatingStars from '@/components/common/RatingStars'

import * as S from '@/styles/pages/caravana'

import {
  formatDateBR,
  formatExcursionistasSince,
  formatPrice,
  formatTimeBR,
  returnInitialsLettersIfNotLogged
} from '@/utils/formats'

import { categories } from '@/constants/categories'
import PassengerForm from '@/components/sections/PassengersForm'
import { toast } from 'react-toastify'
import axios from 'axios'
import MobileHeader from '@/components/sections/MobileHeader'
import { Caravan, SingleCaravan } from '@/interfaces/caravan'

interface CaravanPageProps {
  caravan: SingleCaravan
}

export default function CaravanPage({ caravan }: CaravanPageProps) {
  const router = useRouter()

  const { data: session, status } = useSession()
  const isLogged = !!session

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const [hasReloaded, setHasReloaded] = useState(false)
  const [passengerFormVisible, setPassengerFormVisible] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)

  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [shouldShowExpandButton, setShouldShowExpandButton] = useState(false)

  const handleClosePassengerForm = () => {
    setPassengerFormVisible(false)
  }

  useEffect(() => {
    if (isLogged && !hasReloaded) {
      router.replace(router.asPath)
      setHasReloaded(true)
    }
  }, [isLogged, hasReloaded, router])

  useEffect(() => {
    const el = descriptionRef.current
    if (!el) return

    const isOverflowing = el.scrollHeight > el.clientHeight
    setShouldShowExpandButton(isOverflowing)
  }, [caravan.descricao])

  const handleShowInfos = () => {
    if (!isLogged) {
      if (window.innerWidth <= 940) {
        router.push(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`)
      } else {
        setIsLoginModalOpen(true)
      }
      return
    }
  }

  const handleSubscribe = async () => {
    const missingData =
      !session?.user?.endereco ||
      !session?.user?.passageiroData?.rg ||
      !session?.user?.passageiroData?.cpf

    if (missingData) {
      setPassengerFormVisible(true)
    } else {
      subscribeInCaravan()
    }
  }

  const subscribeInCaravan = async () => {
    try {
      setIsSubscribing(true)
      const response = await axios.post(
        `/api/reservas/${caravan.id}/reservas`,
        {
          passageiro_id: session?.user?.id
        }
      )

      if (response.status === 200) {
        toast.success('Inscrição realizada com sucesso!')
      }
    } catch (error) {
      toast.error('Erro ao se inscrever na caravana')
      console.error('Erro ao se inscrever na caravana', error)
    } finally {
      setIsSubscribing(false)
    }
  }

  const category = categories.find((item) => item.id === caravan.categoria)
  const CategoryIcon = category ? category.icon : null
  const CategoryLabel = category ? category.label : null

  if (status === 'loading' && !session) {
    return
  }
  return (
    <S.Wrapper>
      <Header $variant="simple" />
      <S.Main>
        <div className="container">
          <MobileHeader />
          <S.Container>
            <S.ContentWrapper>
              <S.Content>
                <Gallery
                  images={
                    caravan.imagens?.map((img) =>
                      img.path.replace(/\/{2,}(?=[^/]*$)/, '/')
                    ) || []
                  }
                />
                <S.SpacingMobile>
                  <S.TitleContainer>
                    <S.Title>{caravan.titulo}</S.Title>
                    <S.Location>
                      <MapPin weight="fill" size={18} />
                      <span>{`${caravan.cidade_origem} - ${caravan.estado_origem}`}</span>
                    </S.Location>
                  </S.TitleContainer>
                  <S.DescriptionContainer>
                    <S.Description ref={descriptionRef} $expanded={expanded}>
                      {caravan.descricao}
                    </S.Description>

                    {shouldShowExpandButton && (
                      <button onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Ver menos' : 'Ver descrição completa'}
                      </button>
                    )}
                  </S.DescriptionContainer>
                  <Divider $marginY="8px" />
                  <S.Subtitle>Informações</S.Subtitle>
                  <S.EventContainer>
                    <S.EventItem>
                      {CategoryIcon && <CategoryIcon size={24} />}
                      <S.EventSubItem>
                        <p className="event-subitem-title">Categoria</p>
                        <p className="event-subitem-subtitle">
                          {CategoryLabel && CategoryLabel}
                        </p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <Ticket size={24} />
                      <S.EventSubItem>
                        <p className="event-subitem-title">Vagas restantes</p>
                        <p className="event-subitem-subtitle">
                          {caravan.numero_vagas}
                        </p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <MapPin size={24} />
                      <S.EventSubItem>
                        <p className="event-subitem-title">Origem</p>
                        <p className="event-subitem-subtitle">
                          {caravan.cidade_origem}/{caravan.estado_origem}
                        </p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <MapPin size={24} weight="fill" />
                      <S.EventSubItem>
                        <p className="event-subitem-title">Destino</p>
                        <p className="event-subitem-subtitle">
                          {caravan.cidade_destino}/{caravan.estado_destino}
                        </p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <CalendarDots size={24} />
                      <S.EventSubItem>
                        <p className="event-subitem-title">Data de partida</p>
                        <p className="event-subitem-subtitle">
                          {formatDateBR(caravan.data_partida)}
                        </p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <Clock size={24} />
                      <S.EventSubItem>
                        <p className="event-subitem-title">
                          Horário de partida
                        </p>
                        <p className="event-subitem-subtitle">
                          {formatTimeBR(caravan.data_partida)}
                        </p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <CalendarDots weight="fill" size={24} />
                      <S.EventSubItem>
                        <p className="event-subitem-title">Data de retorno</p>
                        <p className="event-subitem-subtitle">
                          {formatDateBR(caravan.data_retorno)}
                        </p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <Clock weight="fill" size={24} />
                      <S.EventSubItem>
                        <p className="event-subitem-title">
                          Horário de retorno
                        </p>
                        <p className="event-subitem-subtitle">
                          {formatTimeBR(caravan.data_retorno)}
                        </p>
                      </S.EventSubItem>
                    </S.EventItem>
                  </S.EventContainer>
                  <Divider $marginY="8px" />
                  <S.MapContainer>
                    <S.Subtitle>Local do evento</S.Subtitle>
                    <MapEmbed
                      location={`${caravan.endereco_destino} - ${caravan.bairro_destino}, ${caravan.cidade_destino} - ${caravan.estado_destino}`}
                    />
                  </S.MapContainer>
                </S.SpacingMobile>
              </S.Content>
              <S.SpacingMobile>
                <S.Sidebar>
                  <GatedContent
                    isLogged={isLogged}
                    onClick={() => !isLogged && handleShowInfos()}
                  >
                    <S.ContactCard
                      style={{ filter: !isLogged ? 'blur(4px)' : 'none' }}
                    >
                      <S.ContactContainer>
                        <S.Price
                          style={{ filter: !isLogged ? 'blur(4px)' : 'none' }}
                        >
                          {isLogged ? formatPrice(caravan.valor) : 'R$ XXX,XX'}
                        </S.Price>

                        <Button
                          loading={isSubscribing}
                          onClick={handleSubscribe}
                          fullWidth
                        >
                          Inscreva-se
                        </Button>
                      </S.ContactContainer>
                      <Divider $marginY="8px" />
                      <S.ContactInfo>
                        Ao clicar inscreva-se, seus dados serão compartilhados
                        pela Excursionistas com o anunciante
                      </S.ContactInfo>
                    </S.ContactCard>
                  </GatedContent>

                  <GatedContent
                    isLogged={isLogged}
                    onClick={() => !isLogged && handleShowInfos()}
                  >
                    <S.OrganizerContainer
                      style={{ filter: !isLogged ? 'blur(4px)' : 'none' }}
                    >
                      <S.Organizer>
                        <S.OrganizerImage
                          width={60}
                          height={60}
                          alt={''}
                          src={caravan?.organizador?.user?.foto_perfil ?? ''}
                          quality={100}
                        />
                        <S.OrganizerInfo>
                          <S.OrganizerVerified>
                            <p>Organizador verificado</p>
                            <CheckCircle size={16} weight="fill" />
                          </S.OrganizerVerified>

                          <S.OrganizerName>
                            {caravan?.organizador?.nome_fantasia ??
                              caravan?.organizador?.razao_social ??
                              ''}
                          </S.OrganizerName>
                          <RatingStars rating={4.5} />
                        </S.OrganizerInfo>
                      </S.Organizer>
                      <S.OrganizerFooter>
                        <S.OrganizerFooterItem>
                          <CalendarBlank size={18} />
                          <p>
                            {returnInitialsLettersIfNotLogged(
                              formatExcursionistasSince(
                                caravan.organizador.created_at
                              ),
                              isLogged
                            )}
                          </p>
                        </S.OrganizerFooterItem>
                        <S.OrganizerFooterItem>
                          <MapPin size={18} />
                          <p>
                            {returnInitialsLettersIfNotLogged(
                              `${caravan.organizador.bairro}, ${caravan.organizador.cidade} - ${caravan.organizador.estado}`,

                              isLogged
                            )}
                          </p>
                        </S.OrganizerFooterItem>
                      </S.OrganizerFooter>
                    </S.OrganizerContainer>
                  </GatedContent>
                  <S.Hint>
                    <h3 className="hint-title">Dicas de segurança</h3>
                    <p className="hint-description">
                      Não faça pagamentos antes de verificar se o veículo
                      existe.
                    </p>
                    <button
                      onClick={() => {
                        setIsModalOpen(true)
                      }}
                      className="hint-button"
                    >
                      Ver mais dicas
                    </button>
                  </S.Hint>
                </S.Sidebar>
              </S.SpacingMobile>
            </S.ContentWrapper>
          </S.Container>
        </div>
      </S.Main>
      <Portal>
        {isLoginModalOpen && (
          <MultiStepForm
            $isModal
            $isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}
      </Portal>
      <Modal $isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <S.ModalContainer>
          <S.ModalTitle>
            <ShieldCheck size={32} weight="fill" />
            <h2>Dicas de segurança</h2>
          </S.ModalTitle>
          <S.ModalContent>
            <ul>
              <li>
                Não faça pagamentos antes de verificar se o veículo existe.
              </li>
              <li>
                Antes de fechar negócio, sempre busque pelo histórico do
                veículo.
              </li>
              <li>
                Fique atento a preços abaixo do mercado e a excessos de
                facilidades.
              </li>
            </ul>
          </S.ModalContent>
          <S.ModalButton>
            <Button onClick={() => setIsModalOpen(false)} fullWidth>
              OK
            </Button>
          </S.ModalButton>
        </S.ModalContainer>
      </Modal>
      <Footer />
      <PassengerForm
        visible={passengerFormVisible}
        onClose={handleClosePassengerForm}
        caravanaId={caravan.id}
      />
    </S.Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }
  const session = await getSession(context)

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/caravanas/${id}`
    )

    const finalCaravan = session ? data.data : maskCaravanData(data.data)

    return {
      props: { caravan: finalCaravan }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
function maskCaravanData(caravan: Caravan): Caravan {
  return {
    ...caravan,
    id: caravan.id,
    titulo: caravan.titulo,
    categoria: caravan.categoria,
    
    
    
    
    
    
    
    
    
    
    
    
    
    cidade_origem: caravan.cidade_origem,
    estado_origem: caravan.estado_origem,
    cidade_destino: caravan.cidade_destino,

    imagens: caravan.imagens,
    valor: 0,
    descricao: caravan.descricao
  }
}
