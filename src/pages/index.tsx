import { GetServerSidePropsContext } from 'next'

import { Caravan } from '@/interfaces/caravan'
import { formatDateRangeBR } from '@/utils/formats'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import ProductCard from '@/components/sections/ProductCard'

import * as S from '@/styles/pages/home'

interface HomeProps {
  caravans: Caravan[]
}

export default function Home({ caravans }: HomeProps) {
  return (
    <S.Wrapper>
      <Head>
        <title>
          Excursionistas - Encontre ou Anuncie Caravanas para Eventos
        </title>
        <meta
          name="description"
          content="Conectamos viajantes e organizadores de caravanas para os melhores eventos! 🚍✨ Encontre uma caravana para seu próximo evento ou anuncie a sua e leve mais pessoas com você. Simples, rápido e seguro."
        />
        <meta
          property="og:title"
          content="Excursionistas - Encontre ou Anuncie Caravanas para Eventos"
        />
        <meta
          property="og:description"
          content="Conectamos viajantes e organizadores de caravanas para os melhores eventos! 🚍✨ Encontre uma caravana para seu próximo evento ou anuncie a sua e leve mais pessoas com você. Simples, rápido e seguro."
        />
        <meta
          property="og:image"
          content="https://excursionistas.com.br/og.jpeg"
        />
        <meta property="og:url" content="https://excursionistas.com.br/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Excursionistas - Encontre ou Anuncie Caravanas para Eventos"
        />
        <meta
          name="twitter:description"
          content="Conectamos viajantes e organizadores de caravanas para os melhores eventos! 🚍✨ Encontre uma caravana para seu próximo evento ou anuncie a sua e leve mais pessoas com você. Simples, rápido e seguro."
        />
        <meta
          name="twitter:image"
          content="https://excursionistas.com.br/og.jpeg"
        />
      </Head>
      <Header />
      <S.Main>
        <div className="container">
          <S.ProductsContainer>
            {caravans.map((caravan, index) => (
              <ProductCard
                key={index}
                images={
                  caravan.imagens?.map((img) =>
                    img.path.replace(/\/{2,}(?=[^/]*$)/, '/')
                  ) || []
                }
                name={caravan.titulo}
                origin={`${caravan.cidade_origem}/${caravan.estado_origem}`}
                destination={`${caravan.cidade_destino}/${caravan.estado_destino}`}
                date={formatDateRangeBR(
                  caravan.data_partida,
                  caravan.data_retorno
                )}
                priority={index === 0}
                price={caravan.valor}
                href={`/caravana/${caravan.id}`}
              />
            ))}
          </S.ProductsContainer>
        </div>
      </S.Main>
      <Footer />
    </S.Wrapper>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  const caravans = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/caravanas/listar`
  )

  const { data } = caravans

  return {
    props: { session, caravans: data?.data }
  }
}
