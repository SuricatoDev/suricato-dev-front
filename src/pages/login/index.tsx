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
