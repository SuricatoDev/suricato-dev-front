import { GetServerSideProps } from 'next'

import axios from 'axios'
import dynamic from 'next/dynamic'

import {
  CreateAdProvider,
  CreateAdProviderProps
} from '@/contexts/CreateAdContext'

const CaravanForm = dynamic(() => import('@/components/sections/CaravanForm'), {
  ssr: false
})

export default function EditarCaravanaPage({
  initialData
}: CreateAdProviderProps) {
  return (
    <CreateAdProvider initialData={initialData}>
      <CaravanForm mode="edit" initialData={initialData} />
    </CreateAdProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/caravanas/${id}`
    )
    const initialData = response.data.data

    if (response.status !== 200 || !initialData) {
      return { notFound: true }
    }

    return {
      props: { initialData }
    }
  } catch (error) {
    console.error('Erro ao buscar caravana:', error)
    return {
      notFound: true
    }
  }
}
