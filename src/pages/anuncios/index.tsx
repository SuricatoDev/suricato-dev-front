import { useEffect, useState } from 'react'

import { Caravan } from '@/interfaces/caravan'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { SmileySad } from '@phosphor-icons/react/dist/ssr/SmileySad'

import { useFooterVisibility } from '@/hooks/useFooterVisibility'
import { useIsOrganizer } from '@/hooks/useIsOrganizer'

import Button from '@/components/common/Button'
import FloatingActionButton from '@/components/common/FloatingButton'
import Modal from '@/components/common/Modal'
import NotOrganizerMessage from '@/components/common/NotOrganizerMessage'
import Portal from '@/components/common/Portal'
import Tabs, { TabKey } from '@/components/common/Tabs'
import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import MobileHeader from '@/components/sections/MobileHeader'
import ProductCardEdit from '@/components/sections/ProductCardEdit'

import * as S from '@/styles/pages/anuncios'

const OrganizerForm = dynamic(
  () => import('@/components/sections/OrganizerForm'),
  { ssr: false }
)

export default function CaravanasManagementPage() {
  const { isOrganizer, loading } = useIsOrganizer()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<TabKey>('upcoming')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false)

  const [caravans, setCaravans] = useState<Caravan[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const dummyCaravan = {} as Caravan

  const footerVisible = useFooterVisibility('mobile-footer', { threshold: 0.1 })

  const today = new Date()

  const upcomingCaravans =
    caravans?.filter((c) => new Date(c.data_partida) >= today) || []

  const previousCaravans =
    caravans?.filter((c) => new Date(c.data_partida) < today) || []

  const caravansToShow =
    activeTab === 'upcoming' ? upcomingCaravans : previousCaravans

  const caravanToDelete = caravans?.find((c) => c.id === confirmDelete)

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab)
  }

  const handleFloatingButtonClick = () => {
    if (caravans?.length === 0) {
      return router.push('/anuncios/overview/')
    }
    return router.push('/anuncios/novo/')
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

      setCaravans((prev) => (prev ?? []).filter((c) => c.id !== id))
      toast.success('Caravana excluída com sucesso!')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao excluir a caravana.')
    } finally {
      setIsLoadingDelete(false)
      setConfirmDelete(null)
    }
  }

  const handleRegisterCompany = () => {
    if (window.innerWidth <= 940) {
      router.push(
        `/cadastrar-empresa?callbackUrl=${encodeURIComponent(router.asPath)}`
      )
    } else {
      setIsOrganizerModalOpen(true)
    }
    return
  }

  useEffect(() => {
    async function loadCaravans() {
      try {
        const { data } = await axios.get(`/api/caravanas/minhas-caravanas`, {
          withCredentials: true
        })

        setCaravans(Array.isArray(data?.data) ? data.data : [])
      } catch (err) {
        console.error(err)

        setCaravans([])
      } finally {
        setIsLoading(false)
      }
    }

    if (isOrganizer && !loading) {
      loadCaravans()
    }
  }, [isOrganizer])

  if (loading) {
    return null
  }

  if (!isOrganizer && !loading) {
    return (
      <>
        <S.Wrapper>
          <Header $variant="simple" />
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
          onClose={() => {
            setIsOrganizerModalOpen(false)
          }}
          $isOpen={isOrganizerModalOpen}
        />
      </>
    )
  }

  return (
    <>
      <S.Wrapper>
        <Header $variant="simple" />
        <MobileHeader>Meus anúncios</MobileHeader>
        <FloatingActionButton
          onClick={handleFloatingButtonClick}
          footerVisible={footerVisible}
        />
        <S.Main>
          <div className="container">
            <S.Title>Meus anúncios</S.Title>
            <Tabs
              activeTab={activeTab}
              onChange={handleTabChange}
              disablePrevious={previousCaravans?.length === 0}
            />
            <S.SpacingMobile>
              {isLoading || (caravansToShow && caravansToShow.length > 0) ? (
                <S.CaravanGrid>
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <ProductCardEdit
                          key={`skeleton-${i}`}
                          caravan={dummyCaravan}
                          activeTab={activeTab}
                          isOpenMenu={false}
                          onToggleMenu={() => {}}
                          onEdit={() => {}}
                          onDelete={() => {}}
                          priority={false}
                          isLoading={true}
                        />
                      ))
                    : caravansToShow.map((caravan, index) => (
                        <ProductCardEdit
                          key={caravan.id}
                          caravan={caravan}
                          activeTab={activeTab}
                          isOpenMenu={openMenuId === caravan.id}
                          onToggleMenu={handleToggleMenu}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          priority={index === 0}
                          isLoading={false}
                        />
                      ))}
                </S.CaravanGrid>
              ) : (
                <S.EmptyMessage>
                  <SmileySad size={64} weight="fill" />
                  Nenhuma próxima caravana
                </S.EmptyMessage>
              )}
            </S.SpacingMobile>
          </div>
        </S.Main>
        <Footer />
      </S.Wrapper>
      <Portal>
        <Modal
          $isOpen={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          closeButton={false}
        >
          <S.ModalContent>
            <h3>Confirmação</h3>

            <p>
              Deseja realmente excluir a caravana
              {caravanToDelete?.titulo ? (
                <b> {caravanToDelete.titulo + '?'}</b>
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
                onClick={() => {
                  if (confirmDelete) {
                    handleConfirmDelete(confirmDelete)
                  }
                }}
              >
                Confirmar
              </Button>
            </S.ModalButtons>
          </S.ModalContent>
        </Modal>
      </Portal>
    </>
  )
}
