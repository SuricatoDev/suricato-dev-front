import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

import * as S from '@/styles/pages/login'

const LoginForm = dynamic(() => import('@/components/sections/LoginForm'), {
  ssr: false
})

export default function Login() {
  return (
    <S.Wrapper>
      <LoginForm />
    </S.Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session }
  }
}
