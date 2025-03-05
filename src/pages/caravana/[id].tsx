import Header from '@/components/sections/Header'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import * as S from '@/styles/pages/caravana'
import { Gallery } from '@/components/common/Gallery'
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { WarningCircle } from '@phosphor-icons/react/dist/ssr/WarningCircle'
import { Phone } from '@phosphor-icons/react/dist/ssr/Phone'
import { useSession } from 'next-auth/react'
import { formatProductPhoneNumber } from '@/utils/fomatProductPhoneNumber'
import Divider from '@/components/common/Divider'
import { useState } from 'react'
import Portal from '@/components/common/Portal'
import MultiStepForm from '@/components/sections/LoginForm'
import { caravansMock } from '@/mocks/caravans'
import Footer from '@/components/sections/Footer'

interface Caravan {
  id: string
  eventName: string
  organizerName: string
  originLocation: string
  organizerPhone: string
  images: string[]
}

interface CaravanPageProps {
  caravan: Caravan
}

export default function CaravanPage({ caravan }: CaravanPageProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const isLogged = !!session
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleShowNumber = () => {
    if (!isLogged) {
      if (window.innerWidth <= 940) {
        router.push('/login')
      } else {
        setIsLoginModalOpen(true)
      }
      return
    }
  }

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
                    <MapPin weight="fill" size={24} />
                    <span>{caravan.originLocation}</span>
                  </S.Location>

                  <S.Organizer>
                    <S.OrganizerImage
                      width={60}
                      height={60}
                      alt={caravan.organizerName}
                      src="https://picsum.photos/120/120"
                      quality={100}
                    />
                    <S.OrganizerInfo>
                      <p>Organizador</p>
                      <p>
                        <b>{caravan.organizerName}</b>
                      </p>
                    </S.OrganizerInfo>
                  </S.Organizer>
                </S.SpacingMobile>
              </S.Content>
              <S.SpacingMobile>
                <S.Sidebar>
                  <S.ContactCard>
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
                      {!isLogged && (
                        <S.ShowNumbers onClick={handleShowNumber}>
                          Ver número
                        </S.ShowNumbers>
                      )}
                    </S.PhoneContainer>
                    <Divider $marginY="8px" />
                    <S.ContactInfo>
                      Ao clicar para entrar em contato, seus dados serão
                      compartilhados pela Excursionistas com o anunciante
                    </S.ContactInfo>
                  </S.ContactCard>

                  <S.ReportLink href="#">
                    <WarningCircle size={24} weight="bold" />
                    Denunciar essa caravana
                  </S.ReportLink>
                </S.Sidebar>
              </S.SpacingMobile>
            </S.ContentWrapper>
          </S.Container>
        </div>
      </S.Main>
      {isLoginModalOpen && (
        <Portal>
          <MultiStepForm
            $isModal
            $isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        </Portal>
      )}
      <Footer />
    </S.Wrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = caravansMock.map((caravan) => ({
    params: { id: caravan.id.toString() }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id
  const caravan = caravansMock.find((p) => p.id === id)

  if (!caravan) {
    return { notFound: true }
  }

  return {
    props: { caravan },
    revalidate: 3600
  }
}
