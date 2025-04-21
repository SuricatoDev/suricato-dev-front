import { GetServerSideProps } from 'next'

import axios from 'axios'
import dynamic from 'next/dynamic'

import {
  CaravanFormProps,
  CreateAdProvider,
  CreateAdProviderProps
} from '@/contexts/CreateAdContext'

const CaravanForm = dynamic(() => import('@/components/sections/CaravanForm'), {
  ssr: false
})

export default function EditarCaravanaPage({
  initialData
}: CreateAdProviderProps) {
  return
  return (
    <CreateAdProvider initialData={initialData}>
      <CaravanForm mode="edit" initialData={initialData} />
    </CreateAdProvider>
  )
}

export const getServerSideProps: GetServerSideProps<{
  initialData: CaravanFormProps
}> = async (context) => {
  try {
    const { id } = context.query
    const response = await axios.get(
      `${process.env.BACKEND_URL}/caravanas/${id}`
    )

    const caravan = response.data.data as any

    const initialData: CaravanFormProps = {
      caravana_id: caravan.id,
      titulo: caravan.titulo,
      descricao: caravan.descricao,
      categoria: caravan.categoria,
      data_partida: caravan.data_partida,
      data_retorno: caravan.data_retorno,
      endereco_origem: caravan.endereco_origem,
      numero_origem: caravan.numero_origem,
      bairro_origem: caravan.bairro_origem,
      cep_origem: caravan.cep_origem,
      cidade_origem: caravan.cidade_origem,
      estado_origem: caravan.estado_origem,
      complemento_origem: caravan.complemento_origem || '',
      endereco_destino: caravan.endereco_destino,
      numero_destino: caravan.numero_destino,
      bairro_destino: caravan.bairro_destino,
      cep_destino: caravan.cep_destino,
      cidade_destino: caravan.cidade_destino,
      estado_destino: caravan.estado_destino,
      complemento_destino: caravan.complemento_destino || '',
      numero_vagas: caravan.numero_vagas,
      valor: caravan.valor,
      organizador_id: caravan.organizador_id,
      imagens: caravan.imagens.map((img: any) => ({
        id: String(img.id),
        previewUrl: img.path,
        order: img.ordem
      }))
    }

    console.log(initialData)

    return {
      props: { initialData }
    }
  } catch (err) {
    console.error('Erro ao buscar caravana:', err)
    return { notFound: true }
  }
}
