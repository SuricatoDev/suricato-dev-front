import { GetServerSideProps } from 'next'

import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

import * as S from '@/styles/pages/login'

const OrganizerForm = dynamic(
  () => import('@/components/sections/OrganizerForm'),
  { ssr: false }
)

export default function RegisterCompany() {
  return (
    <S.Wrapper>
      <OrganizerForm />
    </S.Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session }
  }
}
