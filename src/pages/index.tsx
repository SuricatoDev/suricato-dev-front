import { useEffect, useRef, useState } from 'react'

import { GetServerSidePropsContext } from 'next'

import { Caravan } from '@/interfaces/caravan'
import { formatDateRangeBR } from '@/utils/formats'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import ProductCard from '@/components/sections/ProductCard'

import * as S from '@/styles/pages/home'

interface HomeProps {
  initialCaravans: Caravan[]
  initialCategory: string
}

export default function Home({ initialCaravans }: HomeProps) {
  const router = useRouter()
  const { categoria } = router.query

  // Carrego o SSR na inicialização:
  const [caravans, setCaravans] = useState<Caravan[]>(initialCaravans)
  const [loading, setLoading] = useState(false)

  // Vou pular a primeira execução, que já vem com SSR:
  const firstRender = useRef(true)

  useEffect(() => {
    if (!router.isReady) return

    if (firstRender.current) {
      firstRender.current = false
      return
    }

    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/caravanas/listar`, {
        params: categoria ? { categoria } : {}
      })
      .then((res) => {
        setCaravans(res.data.data)
      })
      .finally(() => setLoading(false))
  }, [categoria, router.isReady])

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
            {loading || !caravans || caravans.length === 0
              ? Array.from({ length: 10 }).map((_, i) => (
                  <ProductCard
                    key={`skeleton-${i}`}
                    images={[]}
                    name=""
                    origin=""
                    destination=""
                    date=""
                    priority={false}
                    price={0}
                    href=""
                    isLoading={true}
                  />
                ))
              : caravans.map((caravan, index) => (
                  <ProductCard
                    key={caravan.id}
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
                    isLoading={loading}
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
  const { categoria, origem, destino, titulo } = context.query

  const params: Record<string, string> = {}
  if (typeof categoria === 'string') params.categoria = categoria
  if (typeof origem === 'string') params.origem = origem
  if (typeof destino === 'string') params.destino = destino
  if (typeof titulo === 'string') params.titulo = titulo

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/caravanas/listar`,
      { params }
    )

    if (res.status !== 200) {
      return { notFound: true }
    }

    return {
      props: {
        initialCaravans: res.data.data,
        initialFilters: params
      }
    }
  } catch (error) {
    return { notFound: true }
  }
}
