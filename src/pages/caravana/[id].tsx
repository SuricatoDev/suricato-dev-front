import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { GetServerSideProps } from 'next'

import { categories } from '@/constants/categories'
import { SingleCaravan } from '@/interfaces/caravan'
import {
  formatDateBR,
  formatExcursionistasSince,
  formatPrice,
  formatTimeBR,
  returnInitialsLettersIfNotLogged
} from '@/utils/formats'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { CalendarBlank } from '@phosphor-icons/react/dist/ssr/CalendarBlank'
import { CalendarDots } from '@phosphor-icons/react/dist/ssr/CalendarDots'
import { CheckCircle } from '@phosphor-icons/react/dist/ssr/CheckCircle'
import { Clock } from '@phosphor-icons/react/dist/ssr/Clock'
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr/ShieldCheck'
import { Ticket } from '@phosphor-icons/react/dist/ssr/Ticket'

import Button from '@/components/common/Button'
import Divider from '@/components/common/Divider'
import Gallery from '@/components/common/Gallery'
import GatedContent from '@/components/common/GatedContent'
import RatingStars from '@/components/common/RatingStars'
import Skeleton from '@/components/common/Skeleton'
import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import MobileHeader from '@/components/sections/MobileHeader'

import * as S from '@/styles/pages/caravana'

const MapEmbed = dynamic(() => import('@/components/common/MapEmbed'), {
  ssr: false,
  suspense: true
})
const MultiStepForm = dynamic(() => import('@/components/sections/LoginForm'), {
  ssr: false,
  suspense: true
})
const PassengerForm = dynamic(
  () => import('@/components/sections/PassengersForm'),
  { ssr: false, suspense: true }
)
const Portal = dynamic(() => import('@/components/common/Portal'), {
  ssr: false,
  suspense: true
})
const Modal = dynamic(() => import('@/components/common/Modal'), {
  ssr: false,
  suspense: true
})

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

  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null)
  const [mapInView, setMapInView] = useState(false)

  useEffect(() => {
    if (!mapContainer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapInView(true)
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    observer.observe(mapContainer)
    return () => observer.disconnect()
  }, [mapContainer])

  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

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

  const handleSubscribe = useCallback(async () => {
    const missingData =
      !session?.user?.endereco ||
      !session?.user?.passageiroData?.rg ||
      !session?.user?.passageiroData?.cpf

    if (missingData) {
      setPassengerFormVisible(true)
    } else {
      subscribeInCaravan()
    }
  }, [session, caravan.id])

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

  const category = useMemo(
    () => categories.find((item) => item.id === caravan.categoria),
    [caravan.categoria]
  )

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
                  <S.MapContainer
                    ref={setMapContainer}
                    style={{
                      height: '300px'
                    }}
                  >
                    <S.Subtitle>Local do evento</S.Subtitle>

                    {mapInView && hydrated ? (
                      <Suspense
                        fallback={
                          <Skeleton
                            rows={1}
                            columns={1}
                            width="100%"
                            height="300px"
                            gap="8px"
                            radius="4px"
                          />
                        }
                      >
                        <MapEmbed
                          location={`${caravan.endereco_destino} - ${caravan.bairro_destino}, ${caravan.cidade_destino} - ${caravan.estado_destino}`}
                        />
                      </Suspense>
                    ) : (
                      <Skeleton
                        rows={1}
                        columns={1}
                        width="100%"
                        height="300px"
                        gap="8px"
                        radius="4px"
                      />
                    )}
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
                            {returnInitialsLettersIfNotLogged(
                              caravan?.organizador?.nome_fantasia ??
                                caravan?.organizador?.razao_social ??
                                '',
                              isLogged
                            )}
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
      {hydrated && (
        <>
          <Suspense fallback={null}>
            <Portal>
              {isLoginModalOpen && (
                <MultiStepForm
                  $isModal
                  $isOpen={isLoginModalOpen}
                  onClose={() => setIsLoginModalOpen(false)}
                />
              )}
            </Portal>
          </Suspense>
          <Suspense fallback={null}>
            <Modal $isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <S.ModalContainer>
                <S.ModalTitle>
                  <ShieldCheck size={32} weight="fill" />
                  <h2>Dicas de segurança</h2>
                </S.ModalTitle>
                <S.ModalContent>
                  <ul>
                    <li>
                      Não faça pagamentos antes de verificar se o veículo
                      existe.
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
          </Suspense>
        </>
      )}
      <Footer />
      {hydrated && (
        <Suspense fallback={null}>
          <PassengerForm
            visible={passengerFormVisible}
            onClose={handleClosePassengerForm}
            caravanaId={caravan.id}
          />
        </Suspense>
      )}
    </S.Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }

  try {
    const { data } = await axios.get(`
      ${process.env.NEXT_PUBLIC_API_URL}/caravanas/${id}
    `)

    if (!data.data) {
      return {
        notFound: true
      }
    }

    return {
      props: { caravan: data?.data }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
