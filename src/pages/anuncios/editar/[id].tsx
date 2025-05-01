import React, { useEffect, useState } from 'react'

import { GetServerSideProps } from 'next'

import axios from 'axios'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import {
  CaravanFormProps,
  CreateAdProvider,
  ImageItem
} from '@/contexts/CreateAdContext'

interface ServerImage {
  id: number
  ordem: number
  path: string
}

interface ServerCaravan extends Omit<CaravanFormProps, 'imagens'> {
  id: number
  imagens: ServerImage[]
}

const CaravanForm = dynamic(() => import('@/components/forms/CaravanForm'), {
  ssr: false
})

type EditarCaravanaPageProps = {
  initialServerData: ServerCaravan
  caravanId: string
}

export default function EditarCaravanaPage({
  initialServerData,
  caravanId
}: EditarCaravanaPageProps) {
  const [formData, setFormData] = useState<CaravanFormProps | null>(null)

  useEffect(() => {
    if (!initialServerData) return

    const imagensAntigas: ImageItem[] = initialServerData.imagens
      .sort((a, b) => a.ordem - b.ordem)
      .map((img) => ({
        id: String(img.id),
        previewUrl: img.path.replace(/\/{2,}(?=[^/]*$)/, '/'),
        order: img.ordem - 1
      }))

    setFormData({
      caravana_id: initialServerData.id,
      titulo: initialServerData.titulo,
      descricao: initialServerData.descricao,
      categoria: initialServerData.categoria,
      data_partida: initialServerData.data_partida,
      data_retorno: initialServerData.data_retorno,
      endereco_origem: initialServerData.endereco_origem,
      numero_origem: initialServerData.numero_origem,
      bairro_origem: initialServerData.bairro_origem,
      cep_origem: initialServerData.cep_origem,
      cidade_origem: initialServerData.cidade_origem,
      estado_origem: initialServerData.estado_origem,
      complemento_origem: initialServerData.complemento_origem || '',
      endereco_destino: initialServerData.endereco_destino,
      numero_destino: initialServerData.numero_destino,
      bairro_destino: initialServerData.bairro_destino,
      cep_destino: initialServerData.cep_destino,
      cidade_destino: initialServerData.cidade_destino,
      estado_destino: initialServerData.estado_destino,
      complemento_destino: initialServerData.complemento_destino || '',
      numero_vagas: initialServerData.numero_vagas,
      valor: initialServerData.valor,
      organizador_id: initialServerData.organizador_id,
      imagens: imagensAntigas
    })
  }, [initialServerData])

  if (!formData) return <p>Carregando…</p>

  return (
    <CreateAdProvider initialData={formData}>
      <Head>
        <title>Edite seu anúncio - Excursionistas</title>
        <meta
          name="description"
          content="Edite seu anúncio de caravana e continue vendendo suas experiências."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <CaravanForm caravanId={caravanId} mode="edit" initialData={formData} />
    </CreateAdProvider>
  )
}

export const getServerSideProps: GetServerSideProps<
  EditarCaravanaPageProps
> = async (ctx) => {
  const { id } = ctx.query
  if (typeof id !== 'string') {
    throw new Error('Invalid id parameter')
  }
  const { data } = await axios.get(`${process.env.BACKEND_URL}/caravanas/${id}`)
  return {
    props: {
      initialServerData: data.data as ServerCaravan,
      caravanId: id
    }
  }
}
