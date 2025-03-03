import { GetServerSideProps } from 'next'
import * as S from '@/styles/pages/home/styles'
import Header from '@/components/common/Header'
import Layout from '@/containers/Layout'
import Footer from '@/components/common/Footer'
import MobileFooter from '@/components/common/MobileFooter'
import ProductCard from '@/components/common/ProductCard'

export default function Home() {
  return (
    <Layout>
      <S.Wrapper>
        <Header />
        <S.Main>
          <div className="container">
            <S.ProductsContainer>
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />{' '}
              <ProductCard
                images={[
                  'https://a0.muscache.com/im/pictures/1ccd3a06-358e-4bec-8146-1e366d2a628b.jpg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/hosting/Hosting-49840035/original/41336a43-2c66-47e5-97d3-0187d1c2829c.jpeg?im_w=720&im_format=avif',
                  'https://a0.muscache.com/im/pictures/miso/Hosting-49840035/original/5899be8a-bb5e-4c1b-9c48-910b7d5a443f.jpeg?im_w=720&im_format=avif'
                ]}
                location="Córrego do Bom Jesus, Brasil"
                distance="180 km de distância"
                dateRange="16 – 21 de mar."
                price={790}
                rating={4.96}
              />
            </S.ProductsContainer>
          </div>
        </S.Main>
        <Footer />
        <MobileFooter $logged />
      </S.Wrapper>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: ''
    }
  }
}
