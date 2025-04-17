import dynamic from 'next/dynamic'

import { CreateAdProvider } from '@/contexts/CreateAdContext'

const CaravanForm = dynamic(() => import('@/components/sections/CaravanForm'), {
  ssr: false
})

export default function NovaCaravanaPage() {
  return (
    <CreateAdProvider>
      <CaravanForm mode="create" />
    </CreateAdProvider>
  )
}
