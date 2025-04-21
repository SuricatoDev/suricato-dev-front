
import { useEffect, useState } from 'react'

import { GetServerSideProps } from 'next'

import axios from 'axios'
import dynamic from 'next/dynamic'

import {
  CaravanFormProps,
  CreateAdProvider,
  ImageItem
} from '@/contexts/CreateAdContext'


type ServerImage = {
  id: number
  ordem: number
  path: string
  caravana_id: number
  created_at: string
  updated_at: string
}


type ServerCaravan = Omit<CaravanFormProps, 'imagens'> & {
  id: number
  vagas_disponiveis: number
  created_at: string
  updated_at: string
  imagens: ServerImage[]
}

const CaravanForm = dynamic(() => import('@/components/sections/CaravanForm'), {
  ssr: false
})

type EditarCaravanaPageProps = {
  initialServerData: ServerCaravan
}

export default function EditarCaravanaPage({
  initialServerData
}: EditarCaravanaPageProps) {
  const [formData, setFormData] = useState<CaravanFormProps | null>(null)

  function mimeFromExt(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'png':
        return 'image/png'
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'webp':
        return 'image/webp'
      case 'gif':
        return 'image/gif'
      default:
        return 'application/octet-stream'
    }
  }

  useEffect(() => {
    if (!initialServerData) return
    ;(async () => {
      const imagensConvertidas: ImageItem[] = await Promise.all(
        initialServerData.imagens.map(async (img) => {
          const s3Key = new URL(img.path).pathname
          const url = `/uploads${s3Key}`
          const res = await fetch(url)
          const blob = await res.blob()

          const headerType = res.headers.get('Content-Type') || ''
          const finalType =
            headerType === '' || headerType === 'binary/octet-stream'
              ? mimeFromExt(s3Key)
              : headerType

          const fileName = s3Key.split('/').pop()!

          return {
            id: String(img.id),
            file: new File([blob], fileName, { type: finalType }),
            previewUrl: url,
            order: img.ordem - 1
          }
        })
      )

      
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
        imagens: imagensConvertidas
      })
    })()
  }, [initialServerData])

  console.log('formData', formData)
  if (!formData) return <p>Carregando…</p>

  return (
    <CreateAdProvider initialData={formData}>
      <CaravanForm mode="edit" initialData={formData} />
    </CreateAdProvider>
  )
}

export const getServerSideProps: GetServerSideProps<
  EditarCaravanaPageProps
> = async (ctx) => {
  const { id } = ctx.query
  const { data } = await axios.get(`${process.env.BACKEND_URL}/caravanas/${id}`)
  const carro = data.data as ServerCaravan
  return { props: { initialServerData: carro } }
}
