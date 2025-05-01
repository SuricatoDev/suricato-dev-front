import dynamic from 'next/dynamic'
import Head from 'next/head'

import * as S from '@/styles/pages/login'

const OrganizerForm = dynamic(
  () => import('@/components/forms/OrganizerForm'),
  { ssr: false }
)

export default function RegisterCompany() {
  return (
    <S.Wrapper>
      <Head>
        <title>Cadastre sua empresa - Excursionistas</title>
        <meta
          name="description"
          content="Cadastre sua empresa e comece a vender suas experiências."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <OrganizerForm />
    </S.Wrapper>
  )
}
