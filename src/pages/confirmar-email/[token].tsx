import { GetServerSidePropsContext } from 'next'

import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'

import Button from '@/components/common/Button'

import * as S from '@/styles/pages/confirmar-email'

interface ConfirmarEmailProps {
  isValidToken: boolean
}

export default function ConfirmarEmail({ isValidToken }: ConfirmarEmailProps) {
  return (
    <>
      <Head>
        <title>Confirme seu email - Excursionistas</title>
        <meta
          name="description"
          content="Confirme seu e-mail para ativar sua conta no Excursionistas."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <S.Container>
        <S.Header>
          <Image
            src="https://suricatodev.s3.sa-east-1.amazonaws.com/assets/logo.png"
            alt="Logo SuricatoDev"
            width={100}
            height={100}
          />
        </S.Header>
        <S.Content>
          {isValidToken ? (
            <S.Wrapper>
              <S.Title>Bem-vindo ao Excursionistas!</S.Title>
              <S.Text>
                Obrigado por confirmar seu e-mail. Agora você pode aproveitar
                tudo o que o Excursionistas tem a oferecer!
              </S.Text>
              <Button fullWidth href="/">
                Voltar para o site
              </Button>
            </S.Wrapper>
          ) : (
            <S.ErrorText>
              Ocorreu um erro ao confirmar seu e-mail. Verifique se o link está
              correto ou já foi utilizado.
            </S.ErrorText>
          )}
        </S.Content>
      </S.Container>
      <S.Footer>
        &copy; {new Date().getFullYear()} Excursionistas · SuricatoDev | Todos
        os direitos reservados
      </S.Footer>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = context.query

  try {
    const res = await axios.get(
      `${process.env.BACKEND_URL}/confirmar-email/${token}`
    )

    return {
      props: {
        isValidToken: res.status === 200
      }
    }
  } catch {
    return {
      props: {
        isValidToken: false
      }
    }
  }
}
