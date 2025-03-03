import { GetServerSidePropsContext } from 'next'
import * as S from '@/styles/pages/home/styles'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import ProductCard from '@/components/common/ProductCard'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

export default function Home() {
  const cards = Array.from({ length: 20 })
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
            {cards.map((_, index) => (
              <ProductCard
                key={index}
                images={[
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720',
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
                priority={index === 0}
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
  return {
    props: { session }
  }
}
