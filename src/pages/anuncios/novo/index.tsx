import { CaravanForm } from '@/components/sections/CaravanForm'
import { CreateAdProvider } from '@/contexts/CreateAdContext'

export default function NovaCaravanaPage() {
  return (
    <CreateAdProvider>
      <CaravanForm mode="create" />
    </CreateAdProvider>
  )
}
