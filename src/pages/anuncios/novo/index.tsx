import dynamic from 'next/dynamic'
import Head from 'next/head'

import { CreateAdProvider } from '@/contexts/CreateAdContext'

const CaravanForm = dynamic(() => import('@/components/sections/CaravanForm'), {
  ssr: false
})

export default function NovaCaravanaPage() {
  return (
    <CreateAdProvider>
      <Head>
        <title>Crie seu anúncio - Excursionistas</title>
        <meta
          name="description"
          content="Crie seu anúncio de caravana e comece a vender suas experiências."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <CaravanForm mode="create" />
    </CreateAdProvider>
  )
}
