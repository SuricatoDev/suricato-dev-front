import { useMemo, useState } from 'react'

import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { Caravan } from '@/interfaces/caravan'
import axios, { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'
import Head from 'next/head'
import { toast } from 'react-toastify'

import { SmileySad } from '@phosphor-icons/react/dist/ssr'

import Tabs, { TabItem } from '@/components/common/Tabs'
import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import HistoryCard from '@/components/sections/HistoryCard'
import MobileHeader from '@/components/sections/MobileHeader'

import * as S from '@/styles/pages/reservas'

export type Reserva = Caravan & {
  reserva_id: number
  status: 'Pendente' | 'Confirmado' | 'Cancelado'
  nota: number | null
  organizador: {
    id: number
    nome_fantasia: string
    razao_social: string
  }
}

type ReservasPageProps = {
  history: Reserva[]
  userId: string
}

type MyTab = 'upcoming' | 'previous'

export default function Reservas({ history, userId }: ReservasPageProps) {
  const [reservas, setReservas] = useState<Reserva[]>(history)
  const [activeTab, setActiveTab] = useState<MyTab>('upcoming')
  const [cancellingId, setCancellingId] = useState<number | null>(null)
  const [ratingId, setRatingId] = useState<number | null>(null)

  const now = useMemo(() => new Date(), [])
  const upcoming = useMemo(
    () => reservas.filter((item) => new Date(item.data_partida) >= now),
    [reservas, now]
  )
  const previous = useMemo(
    () => reservas.filter((item) => new Date(item.data_partida) < now),
    [reservas, now]
  )

  const tabs: TabItem<MyTab>[] = [
    { key: 'upcoming', label: 'Próximas Caravanas' },
    { key: 'previous', label: 'Histórico', disabled: previous.length === 0 }
  ]

  const displayed = activeTab === 'upcoming' ? upcoming : previous

  const handleCancel = async (id: number) => {
    setCancellingId(id)
    try {
      const reserva = reservas.find((r) => Number(r.id) === id)
      if (!reserva) {
        throw new Error('Reserva não encontrada.')
      }

      const response = await axios.delete(
        `/api/reservas/${userId}/reservas/${reserva.reserva_id}`
      )

      setReservas((prev) =>
        prev.map((r) =>
          Number(r.id) === id ? { ...r, status: 'Cancelado' } : r
        )
      )

      toast.success(response.data?.message ?? 'Reserva cancelada com sucesso!')
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>
      console.error(
        error.response?.data?.message ?? 'Erro ao cancelar reserva:'
      )
      toast.error(error.response?.data?.message ?? 'Erro ao cancelar reserva')
    } finally {
      setCancellingId(null)
    }
  }

  const handleRate = async (id: number, rating: number) => {
    setRatingId(id)
    try {
      const reserva = reservas.find((r) => Number(r.id) === id)
      if (!reserva) {
        throw new Error('Reserva não encontrada.')
      }

      await axios.post(`/api/avaliacoes/registrar`, {
        caravana_id: reserva.id,
        organizador_id: String(reserva.organizador.id),
        nota: rating
      })

      setReservas((prev) =>
        prev.map((r) => (Number(r.id) === id ? { ...r, nota: rating } : r))
      )

      toast.success('Avaliação enviada com sucesso!')
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>
      console.error(error.response?.data?.message ?? 'Erro ao avaliar:')
      toast.error(error.response?.data?.message ?? 'Erro ao avaliar')
    } finally {
      setRatingId(null)
    }
  }

  return (
    <S.Wrapper>
      <Head>
        <title>Minhas Reservas – Excursionistas</title>
      </Head>

      <Header $variant="simple" />
      <MobileHeader>Reservas</MobileHeader>

      <S.Main>
        <div className="container">
          <S.Title>Minhas Reservas</S.Title>
          <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
          <S.SpacingMobile>
            {displayed.length === 0 && (
              <S.EmptyMessage>
                <SmileySad size={64} weight="fill" />
                Nenhuma próxima caravana
              </S.EmptyMessage>
            )}

            {displayed.map((item) => (
              <HistoryCard
                key={item.id}
                caravan={item}
                enableActionsButtons={activeTab === 'upcoming'}
                onCancel={handleCancel}
                isCancelling={cancellingId === Number(item.id)}
                onRate={(rating) => handleRate(Number(item.id), rating)}
                isRating={ratingId === Number(item.id)}
              />
            ))}
          </S.SpacingMobile>
        </div>
      </S.Main>

      <Footer />
    </S.Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps<ReservasPageProps> = async (
  ctx: GetServerSidePropsContext
) => {
  const token = await getToken({
    req: ctx.req,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (!token?.sub) {
    return {
      redirect: { destination: '/login', permanent: false }
    }
  }

  const userId = token.sub as string
  const apiUrl = `${process.env.BACKEND_URL}/caravanas/${userId}/historico`

  try {
    const response = await axios.get<{
      data: Array<{
        caravana: Caravan & {
          organizador: {
            id: number
            nome_fantasia: string
            razao_social: string
          }
        }
        reserva_id: number
        status: 'Pendente' | 'Confirmado' | 'Cancelado'
        nota: number | null
      }>
    }>(apiUrl, {
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    })

    const history: Reserva[] = response.data.data
      .map((item) => ({
        ...item.caravana,
        reserva_id: item.reserva_id,
        status: item.status,
        nota: item.nota,
        organizador: item.caravana.organizador
      }))
      .sort(
        (a, b) =>
          new Date(b.data_partida).getTime() -
          new Date(a.data_partida).getTime()
      )

    return {
      props: { history, userId }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>
    console.error(error.response?.data?.message ?? 'Erro ao buscar histórico:')
    return {
      props: { history: [], userId }
    }
  }
}
