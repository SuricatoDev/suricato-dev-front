import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import LoginForm from '@/components/sections/LoginForm'
import * as S from '@/styles/pages/login'

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
