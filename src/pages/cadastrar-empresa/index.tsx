import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import * as S from '@/styles/pages/login'
import OrganizerForm from '@/components/sections/OrganizerForm'

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
