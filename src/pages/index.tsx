import { GetServerSidePropsContext } from 'next'
import * as S from '@/styles/pages/home'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import ProductCard from '@/components/sections/ProductCard'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image1 from '@/assets/images/example-1.webp'
import Image2 from '@/assets/images/example-2.webp'
import Image3 from '@/assets/images/example-3.webp'

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
                images={[Image1.src, Image2.src, Image3.src]}
                location="Orquestra Sinfônica - Alumni"
                distance="Campos Elíseos - SP"
                date="16 de março"
                hour="10h00"
                priority={index === 0}
                href="/caravana/1"
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
