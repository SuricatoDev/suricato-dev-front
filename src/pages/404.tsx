import Image404 from '@/assets/images/404.png'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/common/Button'

import * as S from '@/styles/pages/404'

export default function Custom404() {
  return (
    <S.Wrapper>
      <Head>
        <title>Página não encontrada - Excursionistas</title>
        <meta
          name="description"
          content="A página que você está procurando não existe."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <h1>Página não encontrada</h1>
      <S.ImageContainer>
        <Image
          src={Image404.src}
          alt="Página não encontrada"
          width={700}
          height={460}
        />
      </S.ImageContainer>

      <S.ButtonContainer>
        <S.ButtonWrapper>
          <Link href="/">
            <Button fullWidth>Voltar para Home</Button>
          </Link>
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.Wrapper>
  )
}
