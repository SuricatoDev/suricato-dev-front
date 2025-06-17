import { useEffect, useState } from 'react'

import { filterFutureCaravans } from '@/utils/caravans'
import { formatDateRangeBR } from '@/utils/formats'
import { motion } from 'framer-motion'
import Head from 'next/head'

import { SmileyXEyes } from '@phosphor-icons/react/dist/ssr/SmileyXEyes'

import { useFavorites } from '@/hooks/useFavorites'

import Footer from '@/components/sections/Footer'
import Header from '@/components/sections/Header'
import MobileHeader from '@/components/sections/MobileHeader'
import ProductCard from '@/components/sections/ProductCard'

import * as S from '@/styles/pages/favoritos'

export default function Favoritos() {
  const { favoriteCaravans, isFavorited, toggleFavorite, loading } =
    useFavorites()

  const [isMounted, setIsMounted] = useState(false)

  const favoriteCaravansFiltered = filterFutureCaravans(favoriteCaravans)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 50)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <S.Wrapper>
      <Head>
        <title>Favoritos - Excursionistas</title>
      </Head>
      <Header variant="simple" caravanas={[]} />
      <MobileHeader>Favoritos</MobileHeader>
      <S.Main>
        <div className="container">
          {!isMounted || loading ? (
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
          ) : favoriteCaravansFiltered.length === 0 ? (
            <S.EmptyMessage>
              <SmileyXEyes size={64} weight="fill" />
              Nenhuma caravana favoritada
            </S.EmptyMessage>
          ) : (
            <S.ProductsContainer>
              {favoriteCaravansFiltered.map((caravan, index) => (
                <motion.div
                  key={caravan.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,

                    delay: index * 0.08
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
