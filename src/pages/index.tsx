import { useEffect, useState } from 'react'

import { Caravan } from '@/interfaces/caravan'
import { filterFutureCaravans } from '@/utils/caravans'
import { formatDateRangeBR } from '@/utils/formats'
import axios from 'axios'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { SmileyXEyes } from '@phosphor-icons/react/dist/ssr/SmileyXEyes'

import { useFavorites } from '@/hooks/useFavorites'

import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import ProductCard from '@/components/sections/ProductCard'

import * as S from '@/styles/pages/home'

interface HomeProps {
  initialCaravans: Caravan[]
}

export default function Home({ initialCaravans }: HomeProps) {
  const router = useRouter()
  const [caravans, setCaravans] = useState(initialCaravans)
  const [loading, setLoading] = useState(false)
  const { isFavorited, toggleFavorite } = useFavorites()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const parsed = new URL(url, window.location.origin)
      const categoria = parsed.searchParams.get('categoria') || undefined
      const origem = parsed.searchParams.get('origem') || undefined
      const destino = parsed.searchParams.get('destino') || undefined
      const titulo = parsed.searchParams.get('titulo') || undefined

      const params: Record<string, string> = {}
      if (categoria) params.categoria = categoria
      if (origem) params.origem = origem
      if (destino) params.destino = destino
      if (titulo) params.titulo = titulo

      if (Object.keys(params).length === 0) {
        setCaravans(filterFutureCaravans(initialCaravans))
        setLoading(false)
        return
      }

      setLoading(true)

      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/caravanas/listar`, { params })
        .then((res) => {
          setCaravans(filterFutureCaravans(res.data.data))
        })
        .catch(() => {
          setCaravans([])
        })
        .finally(() => {
          setLoading(false)
        })
    }

    handleRouteChange(window.location.href)

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
      <Header caravanas={caravans} />
      <S.Main>
        <div className="container">
          {loading ? (
            <S.ProductsContainer>
              {Array.from({ length: 16 }).map((_, i) => (
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
                  isFavorited={false}
                  onToggleFavorite={() => {}}
                />
              ))}
            </S.ProductsContainer>
          ) : caravans.length === 0 ? (
            <S.EmptyMessage>
              <SmileyXEyes size={64} weight="fill" />
              Nenhuma caravana encontrada
            </S.EmptyMessage>
          ) : (
            <S.ProductsContainer>
              {caravans.map((caravan, index) => (
                <motion.div
                  key={caravan.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                    delay: index * 0.07
                  }}
                >
                  <ProductCard
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
                    isLoading={false}
                    isFavorited={isFavorited(String(caravan.id))}
                    onToggleFavorite={() =>
                      toggleFavorite(
                        String(caravan.id),
                        !isFavorited(String(caravan.id)),
                        caravan.titulo
                      )
                    }
                  />
                </motion.div>
              ))}
            </S.ProductsContainer>
          )}
        </div>
      </S.Main>
      <Footer />
    </S.Wrapper>
  )
}

export async function getStaticProps() {
  try {
    const res = await axios.get(`${process.env.BACKEND_URL}/caravanas`)

    return {
      props: {
        initialCaravans: res.data.data
      },
      revalidate: 300
    }
  } catch {
    return {
      props: {
        initialCaravans: []
      },
      revalidate: 300
    }
  }
}
