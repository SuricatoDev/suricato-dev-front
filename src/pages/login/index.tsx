import dynamic from 'next/dynamic'
import Head from 'next/head'

import * as S from '@/styles/pages/login'

const LoginForm = dynamic(() => import('@/components/forms/LoginForm'), {
  ssr: false
})

export default function Login() {
  return (
    <S.Wrapper>
      <Head>
        <title>Entrar ou Cadastrar – Excursionistas</title>
        <meta
          name="description"
          content="Entre na sua conta ou cadastre-se no Excursionistas para buscar, reservar e gerenciar vagas em caravanas para shows, feiras e eventos com segurança e praticidade."
        />
      </Head>
      <LoginForm />
    </S.Wrapper>
  )
}
