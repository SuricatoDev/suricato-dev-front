import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'

import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { Phone } from '@phosphor-icons/react/dist/ssr/Phone'
import { Flag } from '@phosphor-icons/react/dist/ssr/Flag'
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr/CalendarBlank'
import { CheckCircle } from '@phosphor-icons/react/dist/ssr/CheckCircle'
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr/ShieldCheck'
import { CalendarDots } from '@phosphor-icons/react/dist/ssr/CalendarDots'
import { Clock } from '@phosphor-icons/react/dist/ssr/Clock'
import { Ticket } from '@phosphor-icons/react/dist/ssr/Ticket'

import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import MultiStepForm from '@/components/sections/LoginForm'
import { Gallery } from '@/components/common/Gallery'
import Divider from '@/components/common/Divider'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import Portal from '@/components/common/Portal'
import GatedContent from '@/components/common/GatedContent'
import { WhatsappIcon } from '@/components/common/Icons'

import * as S from '@/styles/pages/caravana'

import { caravansMock } from '@/mocks/caravans'
import {
  formatProductPhoneNumber,
  formatPrice,
  returnInitialsLettersIfNotLogged
} from '@/utils/formats'
import MapEmbed from '@/components/common/MapEmbed'
import RatingStars from '@/components/common/RatingStars'

import { categories } from '@/constants/categories'
interface Caravan {
  id: string
  eventName: string
  category: string
  organizerName: string
  originLocation: string
  destination: string
  organizerPhone: string
  images: string[]
  price: number
  description: string
}

interface CaravanPageProps {
  caravan: Caravan
}

export default function CaravanPage({ caravan }: CaravanPageProps) {
  const router = useRouter()

  const { data: session } = useSession()
  const isLogged = !!session

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const [hasReloaded, setHasReloaded] = useState(false)

  useEffect(() => {
    if (isLogged && !hasReloaded) {
      router.replace(router.asPath)
      setHasReloaded(true)
    }
  }, [isLogged, hasReloaded, router])

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

  const category = categories.find((item) => item.id === caravan.category)
  const CategoryIcon = category ? category.icon : null
  const CategoryLabel = category ? category.label : null
  return (
    <S.Wrapper>
      <Header $variant="simple" />
      <S.Main>
        <div className="container">
          <S.Container>
            <S.Title className="hide-in-mobile">{caravan.eventName}</S.Title>

            <S.ContentWrapper>
              <S.Content>
                <Gallery images={caravan.images} />
                <S.SpacingMobile>
                  <S.Title className="hide-in-desktop">
                    {caravan.eventName}
                  </S.Title>
                  <S.Location>
                    <MapPin weight="fill" size={18} />
                    <span>{caravan.originLocation}</span>
                  </S.Location>
                  <S.DescriptionContainer>
                    <S.Description $expanded={expanded}>
                      {caravan.description}
                    </S.Description>
                    <button onClick={() => setExpanded(!expanded)}>
                      {expanded ? '' : 'Ver descrição completa'}
                    </button>
                  </S.DescriptionContainer>
                  <Divider $marginY="8px" />
                  <S.Subtitle>Informações do evento:</S.Subtitle>
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
                        <p className="event-subitem-subtitle">5</p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <MapPin size={24} />
                      <S.EventSubItem>
                        <p className="event-subitem-title">Origem</p>
                        <p className="event-subitem-subtitle">Sorocaba/SP</p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <MapPin size={24} weight="fill" />
                      <S.EventSubItem>
                        <p className="event-subitem-title">Destino</p>
                        <p className="event-subitem-subtitle">
                          Campos Elíseos/SP
                        </p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <CalendarDots size={24} />
                      <S.EventSubItem>
                        <p className="event-subitem-title">Dia</p>
                        <p className="event-subitem-subtitle">16/03/2025</p>
                      </S.EventSubItem>
                    </S.EventItem>
                    <S.EventItem>
                      <Clock size={24} />
                      <S.EventSubItem>
                        <p className="event-subitem-title">Horário</p>
                        <p className="event-subitem-subtitle">10h00m</p>
                      </S.EventSubItem>
                    </S.EventItem>
                  </S.EventContainer>
                  <Divider $marginY="8px" />
                  <S.MapContainer>
                    <S.Subtitle>Local do evento:</S.Subtitle>
                    <MapEmbed location={caravan.destination} />
                  </S.MapContainer>
                </S.SpacingMobile>
              </S.Content>
              <S.SpacingMobile>
                <S.Sidebar>
                  <GatedContent
                    isLogged={isLogged}
                    onClick={() => !isLogged && handleShowInfos()}
                  >
                    <S.ContactCard>
                      <S.ContactContainer>
                        <S.Price
                          style={{ filter: !isLogged ? 'blur(4px)' : 'none' }}
                        >
                          {isLogged ? formatPrice(caravan.price) : 'R$ XXX,XX'}
                        </S.Price>

                        <S.PhoneContainer>
                          <S.PhoneNumber $isLogged={isLogged}>
                            <Phone size={24} weight="fill" />
                            <p>
                              {formatProductPhoneNumber(
                                caravan.organizerPhone,
                                isLogged
                              )}
                            </p>
                          </S.PhoneNumber>
                        </S.PhoneContainer>

                        <Button
                          href={
                            isLogged
                              ? `https://api.whatsapp.com/send?phone=${caravan.organizerPhone}`
                              : ''
                          }
                          target="_blank"
                          rel="noreferrer"
                          as="a"
                          className="whatsapp-button"
                          fullWidth
                        >
                          <S.WhatsappContent>
                            <WhatsappIcon />
                            <span>Whatsapp</span>
                          </S.WhatsappContent>
                        </Button>
                      </S.ContactContainer>
                      <Divider $marginY="8px" />
                      <S.ContactInfo>
                        Ao clicar para entrar em contato, seus dados serão
                        compartilhados pela Excursionistas com o anunciante
                      </S.ContactInfo>
                    </S.ContactCard>
                  </GatedContent>

                  <GatedContent
                    isLogged={isLogged}
                    onClick={() => !isLogged && handleShowInfos()}
                  >
                    <S.OrganizerContainer>
                      <S.Organizer>
                        <S.OrganizerImage
                          width={60}
                          height={60}
                          alt={caravan.organizerName}
                          src="https://picsum.photos/120/120"
                          quality={100}
                        />
                        <S.OrganizerInfo>
                          <S.OrganizerVerified>
                            <p>Organizador verificado</p>
                            <CheckCircle size={16} weight="fill" />
                          </S.OrganizerVerified>

                          <S.OrganizerName>
                            {caravan.organizerName}
                          </S.OrganizerName>
                          <RatingStars rating={4.5} />
                        </S.OrganizerInfo>
                      </S.Organizer>
                      <S.OrganizerFooter>
                        <S.OrganizerFooterItem>
                          <CalendarBlank size={18} />
                          <p>
                            {returnInitialsLettersIfNotLogged(
                              'No Excursionistas desde abril de 2022',
                              isLogged
                            )}
                          </p>
                        </S.OrganizerFooterItem>
                        <S.OrganizerFooterItem>
                          <MapPin size={18} />
                          <p>
                            {returnInitialsLettersIfNotLogged(
                              'Vila Assis, Sorocaba - SP',
                              isLogged
                            )}
                          </p>
                        </S.OrganizerFooterItem>
                        <S.ViewProfileButton rounded variant="outlined">
                          Acessar perfil
                        </S.ViewProfileButton>
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

                  <S.ReportLink href="#">
                    <Flag size={24} weight="bold" />
                    Denunciar essa caravana
                  </S.ReportLink>
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
    </S.Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }
  const session = await getSession(context)

  const caravan = caravansMock.find((p) => p.id === id)

  if (!caravan) {
    return { notFound: true }
  }

  const finalCaravan = session ? caravan : maskCaravanData(caravan)

  return {
    props: { caravan: finalCaravan }
  }
}

function maskCaravanData(caravan: Caravan): Caravan {
  return {
    id: caravan.id,
    eventName: caravan.eventName,
    category: caravan.category,
    organizerName: returnInitialsLettersIfNotLogged(
      caravan.organizerName,
      false
    ),
    originLocation: caravan.originLocation,
    destination: caravan.destination,
    organizerPhone: formatProductPhoneNumber(caravan.organizerPhone, false),
    images: caravan.images,
    price: 0,
    description: caravan.description
  }
}
