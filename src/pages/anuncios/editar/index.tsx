import { GetServerSideProps } from 'next'

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
  const { caravan_id } = context.query

  const res = await fetch(`/api/caravanas/${caravan_id}`)

  const initialData = await res.json()

  if (!initialData || res.status !== 200) {
    return {
      notFound: true
    }
  }

  return {
    props: { initialData }
  }
}
