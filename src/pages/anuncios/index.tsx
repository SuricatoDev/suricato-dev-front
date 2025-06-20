import { useState } from 'react'

import { Caravan } from '@/interfaces/caravan'
import { fetcher } from '@/utils/fetcher'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import useSWR, { mutate } from 'swr'

import { SmileySad } from '@phosphor-icons/react/dist/ssr/SmileySad'

import { useFooterVisibility } from '@/hooks/useFooterVisibility'
import useIsMobile from '@/hooks/useIsMobile'
import { useIsOrganizer } from '@/hooks/useIsOrganizer'

import Button from '@/components/common/Button'
import FloatingActionButton from '@/components/common/FloatingButton'
import Modal from '@/components/common/Modal'
import NotOrganizerMessage from '@/components/common/NotOrganizerMessage'
import Portal from '@/components/common/Portal'
import Tabs, { TabItem } from '@/components/common/Tabs'
import ReservationConfirmationModal from '@/components/sections/ConfirmReservationModal'
import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import MobileHeader from '@/components/sections/MobileHeader'
import ProductCardEdit from '@/components/sections/ProductCardEdit'
import RatePassengerModal from '@/components/sections/RatePassengerModal'

import * as S from '@/styles/pages/anuncios'

const OrganizerForm = dynamic(
  () => import('@/components/forms/OrganizerForm'),
  { ssr: false }
)

type MyTab = 'upcoming' | 'previous'

export default function CaravanasManagementPage() {
  const { isOrganizer, loading: orgLoading } = useIsOrganizer()
  const { data: session, update } = useSession()
  const isMobile = useIsMobile()

  const router = useRouter()

  const [activeTab, setActiveTab] = useState<MyTab>('upcoming')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [selectedCaravan, setSelectedCaravan] = useState<Caravan | null>(null)

  const footerVisible = useFooterVisibility('mobile-footer', { threshold: 0.1 })

  const {
    data: caravans = [],
    error,
    isValidating
  } = useSWR<Caravan[]>(
    !orgLoading && isOrganizer ? '/api/caravanas/minhas-caravanas' : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false
    }
  )

  const isLoading = orgLoading || isValidating

  const today = new Date()
  const upcomingCaravans = caravans.filter(
    (c) => new Date(c.data_partida) >= today
  )
  const previousCaravans = caravans.filter(
    (c) => new Date(c.data_partida) < today
  )
  const caravansToShow =
    activeTab === 'upcoming' ? upcomingCaravans : previousCaravans

  const caravanToDelete = caravans.find((c) => c.id === confirmDelete)

  const handleViewReservations = (caravan: Caravan) => {
    setSelectedCaravan(caravan)
  }

  const tabs: TabItem<MyTab>[] = [
    { key: 'upcoming', label: 'Próximas Caravanas' },
    {
      key: 'previous',
      label: 'Caravanas Anteriores',
      disabled: previousCaravans.length === 0
    }
  ]

  const handleTabChange = (tab: MyTab) => {
    setActiveTab(tab)
    setOpenMenuId(null)
  }

  const handleFloatingButtonClick = () => {
    if (caravans.length === 0) {
      router.push('/anuncios/overview/')
    } else {
      router.push('/anuncios/novo/')
    }
  }

  const handleToggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const handleEdit = (id: string) => {
    setOpenMenuId(null)
    router.push(`/anuncios/editar/${id}`)
  }

  const handleDelete = (id: string) => {
    setOpenMenuId(null)
    setConfirmDelete(id)
  }

  const handleConfirmDelete = async (id: string) => {
    setIsLoadingDelete(true)
    try {
      await axios.delete(`/api/caravanas/deletar/${id}`)

      toast.success('Caravana excluída com sucesso!')

      mutate(
        '/api/caravanas/minhas-caravanas',
        caravans.filter((c) => c.id !== id),
        false
      )
    } catch (err) {
      console.error(err)
      toast.error('Erro ao excluir a caravana.')
    } finally {
      setIsLoadingDelete(false)
      setConfirmDelete(null)
    }
  }

  const handleRegisterCompany = async () => {
    if (!session?.user?.verificado) {
      const newSession = await update()

      if (!newSession?.user?.verificado) {
        toast.error(
          'Você precisa confirmar seu e-mail para se cadastrar como organizador.'
        )
        return
      }
    }

    if (window.innerWidth <= 940) {
      router.push(
        `/cadastrar-empresa?callbackUrl=${encodeURIComponent(router.asPath)}`
      )
    } else {
      setIsOrganizerModalOpen(true)
    }
  }

  if (orgLoading) {
    return null
  }

  if (!isOrganizer) {
    return (
      <>
        <S.Wrapper>
          <Header variant="simple" />
          <MobileHeader>Cadastrar Empresa</MobileHeader>
          <S.MainCenter>
            <S.SpacingMobile>
              <NotOrganizerMessage onClick={handleRegisterCompany} />
            </S.SpacingMobile>
          </S.MainCenter>
          <Footer />
        </S.Wrapper>
        <OrganizerForm
          $isModal
          isOpen={isOrganizerModalOpen}
          onClose={() => setIsOrganizerModalOpen(false)}
        />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Meus anúncios - Excursionistas</title>
        <meta
          name="description"
          content="Gerencie seus anúncios de caravana e venda suas experiências."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <S.Wrapper>
        <Header variant="simple" />
        <MobileHeader>Meus anúncios</MobileHeader>
        <FloatingActionButton
          onClick={handleFloatingButtonClick}
          bottom={footerVisible ? 80 : isMobile ? 20 : 80}
          right={isMobile ? 16 : 40}
          iconColor="#FFF"
          size={60}
        />
        <S.Main>
          <div className="container">
            <S.Title>Meus anúncios</S.Title>
            <Tabs
              items={tabs}
              activeKey={activeTab}
              onChange={handleTabChange}
            />

            <S.SpacingMobile>
              {isLoading ? (
                <S.CaravanGrid>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardEdit
                      key={`skeleton-${i}`}
                      caravan={{} as Caravan}
                      activeTab={activeTab}
                      isOpenMenu={false}
                      onToggleMenu={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      priority={false}
                      isLoading
                    />
                  ))}
                </S.CaravanGrid>
              ) : error ? (
                <S.EmptyMessage>
                  <SmileySad size={64} weight="fill" />
                  Nenhuma próxima caravana
                </S.EmptyMessage>
              ) : caravansToShow.length > 0 ? (
                <AnimatePresence initial={true} mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit="hidden"
                  >
                    <S.CaravanGrid>
                      {caravansToShow.map((caravan, idx) => (
                        <motion.div
                          key={caravan.id}
                          initial={{ opacity: 0, y: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit="hidden"
                          className="product-card-edit"
                          style={{ overflow: 'hidden' }}
                          transition={{
                            duration: 0.3,

                            delay: idx * 0.08
                          }}
                        >
                          <ProductCardEdit
                            key={caravan.id}
                            caravan={caravan}
                            activeTab={activeTab}
                            isOpenMenu={openMenuId === caravan.id}
                            onToggleMenu={handleToggleMenu}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            priority={idx === 0}
                            isLoading={false}
                            onViewReservations={() => {
                              handleViewReservations(caravan)
                            }}
                          />
                        </motion.div>
                      ))}
                    </S.CaravanGrid>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <S.EmptyMessage>
                  <SmileySad size={64} weight="fill" />
                  Nenhuma {activeTab === 'upcoming'
                    ? 'próxima'
                    : 'anterior'}{' '}
                  caravana
                </S.EmptyMessage>
              )}
            </S.SpacingMobile>
          </div>
        </S.Main>
        <Footer />
      </S.Wrapper>

      <Portal>
        <Modal
          isOpen={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          closeButton={false}
        >
          <S.ModalContent>
            <h3>Confirmação</h3>
            <p>
              Deseja realmente excluir a caravana
              {caravanToDelete?.titulo ? (
                <b> {caravanToDelete.titulo}?</b>
              ) : (
                '?'
              )}
            </p>
            <S.ModalButtons>
              <Button
                variant="outlined"
                fullWidth
                disabled={isLoadingDelete}
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                variant="danger"
                loading={isLoadingDelete}
                disabled={isLoadingDelete}
                onClick={() =>
                  confirmDelete && handleConfirmDelete(confirmDelete)
                }
              >
                Confirmar
              </Button>
            </S.ModalButtons>
          </S.ModalContent>
        </Modal>
        {selectedCaravan &&
          (activeTab === 'upcoming' ? (
            <ReservationConfirmationModal
              caravanId={selectedCaravan.id}
              caravanTitle={selectedCaravan.titulo}
              isOpen={!!selectedCaravan}
              onClose={() => setSelectedCaravan(null)}
            />
          ) : (
            <RatePassengerModal
              caravanId={selectedCaravan.id}
              caravanTitle={selectedCaravan.titulo}
              isOpen={!!selectedCaravan}
              onClose={() => setSelectedCaravan(null)}
            />
          ))}
      </Portal>
    </>
  )
}
