import { useState } from 'react'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import Button from '@/components/common/Button'
import * as S from '@/styles/pages/anuncios'
import { format } from 'date-fns'
import Tabs, { TabKey } from '@/components/common/Tabs'
import FloatingActionButton from '@/components/common/FloatingButton'

import { CalendarBlank } from '@phosphor-icons/react/dist/ssr/CalendarBlank'
import { Ticket } from '@phosphor-icons/react/dist/ssr/Ticket'
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { MoneyWavy } from '@phosphor-icons/react/dist/ssr/MoneyWavy'
import { ArrowsLeftRight } from '@phosphor-icons/react/dist/ssr/ArrowsLeftRight'
import { DotsThree } from '@phosphor-icons/react/dist/ssr/DotsThree'
import { SmileySad } from '@phosphor-icons/react/dist/ssr/SmileySad'
import { useRouter } from 'next/router'
import Portal from '@/components/common/Portal'
import Modal from '@/components/common/Modal'

interface Caravan {
  id: string
  titulo: string
  descricao: string
  categoria: string
  data_partida: string
  data_retorno: string
  endereco_origem: string
  numero_origem: string
  bairro_origem: string
  cep_origem: string
  cidade_origem: string
  estado_origem: string
  endereco_destino: string
  numero_destino: string
  bairro_destino: string
  cep_destino: string
  cidade_destino: string
  estado_destino: string
  numero_vagas: number
  valor: number
  organizador_id: number
  imagens: {
    path: string
  }[]
}

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
  imagens: [{ path: 'https://picsum.photos/1920/1081' }]
}


function generateMockCaravans(count: number): Caravan[] {
  const baseNumber = 1080
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1
    return {
      ...baseCaravan,
      id: String(id),
      imagens: [{ path: `https://picsum.photos/1920/${baseNumber + id}` }]
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

  const handleConfirmDelete = (id: string) => {
    
    setCaravans((prev) => prev.filter((c) => c.id !== id))
    setConfirmDelete(null)
  }

  return (
    <>
      <S.Wrapper>
        <Header $variant="simple" />
        <FloatingActionButton onClick={handleFloatingButtonClick} />
        <S.Main>
          <div className="container">
            <S.SpacingMobile>
              <S.Title>Meus anúncios</S.Title>
            </S.SpacingMobile>

            <Tabs
              activeTab={activeTab}
              onChange={handleTabChange}
              disablePrevious={previousCaravans.length === 0}
            />

            <S.SpacingMobile>
              {caravansToShow.length > 0 ? (
                <S.CaravanGrid>
                  {caravansToShow.map((caravan) => (
                    <S.Card key={caravan.id}>
                      <S.CardHeader>
                        <S.CardImage bg={caravan.imagens[0].path} />
                        <S.CardCategory>{caravan.categoria}</S.CardCategory>
                      </S.CardHeader>

                      <S.CardBody>
                        <S.CardTitle>{caravan.titulo}</S.CardTitle>
                        <S.Description>
                          <span>
                            <b>Descrição:</b>{' '}
                            {caravan.descricao.length > 80
                              ? `${caravan.descricao.substring(0, 80)}...`
                              : caravan.descricao}
                          </span>
                        </S.Description>
                        <S.CardSubInfo>
                          <S.SubInfoItem>
                            <MapPin size={16} weight="bold" /> <b>Endereço:</b>{' '}
                            {caravan.cidade_origem}/{caravan.estado_origem}{' '}
                            <ArrowsLeftRight size={16} />
                            {caravan.cidade_destino}/{caravan.estado_destino}
                          </S.SubInfoItem>
                          <S.SubInfoItem>
                            <CalendarBlank size={16} weight="bold" />{' '}
                            <b>Data</b>{' '}
                            <span>
                              {format(
                                new Date(caravan.data_partida),
                                'dd/MM/yyyy'
                              )}{' '}
                              -{' '}
                              {format(
                                new Date(caravan.data_retorno),
                                'dd/MM/yyyy'
                              )}
                            </span>
                          </S.SubInfoItem>

                          <S.SubInfoItem>
                            <MoneyWavy size={16} fill="bold" /> <b>Preço:</b>{' '}
                            {caravan.valor.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </S.SubInfoItem>
                          <S.SubInfoItem>
                            <Ticket fill="bold" size={16} /> <b>Reservas:</b>
                            10 / 50
                          </S.SubInfoItem>
                        </S.CardSubInfo>
                      </S.CardBody>

                      <S.MenuWrapper>
                        <S.MenuToggle
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === caravan.id ? null : caravan.id
                            )
                          }
                        >
                          <DotsThree size={20} weight="bold" />
                        </S.MenuToggle>
                        {openMenuId === caravan.id && (
                          <S.MenuList>
                            <S.MenuItem
                              onClick={() => {
                                setOpenMenuId(null)
                                
                              }}
                            >
                              Editar
                            </S.MenuItem>
                            <S.MenuItem
                              onClick={() => {
                                setOpenMenuId(null)
                                
                                setConfirmDelete(caravan.id)
                              }}
                            >
                              Excluir
                            </S.MenuItem>
                          </S.MenuList>
                        )}
                      </S.MenuWrapper>

                      {activeTab === 'upcoming' && (
                        <S.CardFooter>
                          <Button fullWidth>Ver reservas</Button>
                        </S.CardFooter>
                      )}
                    </S.Card>
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

      {
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
      }
    </>
  )
}
