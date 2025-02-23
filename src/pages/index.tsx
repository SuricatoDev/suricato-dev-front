import { GetServerSideProps } from 'next'
import * as S from './styles'
import Header from '@/components/Header'
import Layout from '@/containers/Layout'
import Footer from '@/components/Footer'
import MobileFooter from '@/components/MobileFooter'

export default function Home() {
  return (
    <Layout>
      <S.Wrapper>
        <Header />
        <S.Main></S.Main>
        <Footer />
        <MobileFooter />
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
