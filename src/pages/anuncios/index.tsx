import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import Button from '@/components/common/Button'
import * as S from '@/styles/pages/anuncios'
import Tabs, { TabKey } from '@/components/common/Tabs'
import FloatingActionButton from '@/components/common/FloatingButton'
import MobileHeader from '@/components/sections/MobileHeader'
import { useFooterVisibility } from '@/hooks/useFooterVisibility'
import Portal from '@/components/common/Portal'
import Modal from '@/components/common/Modal'
import { SmileySad } from '@phosphor-icons/react/dist/ssr/SmileySad'
import ProductCardEdit, { Caravan } from '@/components/sections/ProductCardEdit'

const baseCaravan: Caravan = {
  id: '1',
  titulo: 'Orquestra Sinfônica - Alumni',
  descricao: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent vitae eros eget tellus tristique bibendum. Donec
    rutrum sed sem quis venenatis. Proin viverra risus a
    ringilla varius. Nulla facilisi. Curabitur nec lacus
    elit. Pellentesque convallis nisi ac augue pharetra eu
    tristique neque consequat. Lorem ipsum dolor sit amet,
    onsectetur adipiscing elit. Praesent vitae eros eget
    tellus tristique bibendum.`,
  categoria: 'Show',
  data_partida: '2025-06-15',
  data_retorno: '2025-06-16',
  endereco_origem: 'Avenida Paulista',
  numero_origem: '1000',
  bairro_origem: 'Bela Vista',
  cep_origem: '01310-100',
  cidade_origem: 'São Paulo',
  estado_origem: 'SP',
  endereco_destino: 'Praia de Copacabana',
  numero_destino: '200',
  bairro_destino: 'Copacabana',
  cep_destino: '22060-001',
  cidade_destino: 'Rio de Janeiro',
  estado_destino: 'RJ',
  numero_vagas: 50,
  valor: 250,
  organizador_id: 1,
  imagens: [
    { path: 'https://picsum.photos/1920/1081' },
    { path: 'https://picsum.photos/1920/1082' },
    { path: 'https://picsum.photos/1920/1083' },
    { path: 'https://picsum.photos/1920/1084' },
    { path: 'https://picsum.photos/1920/1085' },
    { path: 'https://picsum.photos/1920/1086' }
  ]
}

function generateMockCaravans(count: number): Caravan[] {
  const baseNumber = 1080
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1
    return {
      ...baseCaravan,
      id: String(id),
      imagens: [
        { path: `https://picsum.photos/1920/${baseNumber + id}` },
        { path: `https://picsum.photos/1921/${baseNumber + id + 1}` },
        { path: `https://picsum.photos/1922/${baseNumber + id + 2}` },
        { path: `https://picsum.photos/1923/${baseNumber + id + 3}` },
        { path: `https://picsum.photos/1924/${baseNumber + id + 4}` },
        { path: `https://picsum.photos/1925/${baseNumber + id + 5}` }
      ]
    }
  })
}

const mockedCaravans = generateMockCaravans(20)

export default function CaravanasManagementPage() {
  const router = useRouter()
  const [caravans, setCaravans] = useState<Caravan[]>(mockedCaravans)
  const [activeTab, setActiveTab] = useState<TabKey>('upcoming')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const footerVisible = useFooterVisibility('mobile-footer', { threshold: 0.1 })

  const today = new Date()
  const upcomingCaravans = caravans.filter(
    (caravan) => new Date(caravan.data_partida) >= today
  )
  const previousCaravans = caravans.filter(
    (caravan) => new Date(caravan.data_partida) < today
  )

  const caravansToShow =
    activeTab === 'upcoming' ? upcomingCaravans : previousCaravans

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab)
  }

  const handleFloatingButtonClick = () => {
    if (caravans.length === 0) {
      return router.push('/anunciar/overview')
    }
    return router.push('/anunciar/')
  }

  const handleToggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const handleEdit = (id: string) => {
    setOpenMenuId(null)

    router.push(`/anunciar/editar/${id}`)
  }

  const handleDelete = (id: string) => {
    setOpenMenuId(null)
    setConfirmDelete(id)
  }

  const handleConfirmDelete = (id: string) => {
    setCaravans((prev) => prev.filter((c) => c.id !== id))
    setConfirmDelete(null)
  }

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCaravans(mockedCaravans)
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

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
              disablePrevious={previousCaravans.length === 0}
            />
            <S.SpacingMobile>
              {caravansToShow.length > 0 ? (
                <S.CaravanGrid>
                  {caravansToShow.map((caravan, index) => (
                    <ProductCardEdit
                      key={caravan.id}
                      caravan={caravan}
                      activeTab={activeTab}
                      isOpenMenu={openMenuId === caravan.id}
                      onToggleMenu={handleToggleMenu}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      priority={index === 0}
                      isLoading={isLoading}
                    />
                  ))}
                </S.CaravanGrid>
              ) : (
                <S.Fallback>
                  <SmileySad size={48} />
                  <p>Nenhuma caravana cadastrada.</p>
                </S.Fallback>
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
            <p>Deseja realmente excluir esta caravana?</p>
            <S.ModalButtons>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                variant="danger"
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
