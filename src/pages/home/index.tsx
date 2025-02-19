// Imports from Next.js
import { GetServerSideProps } from 'next'
import * as S from './styles'
import Header from '@/components/Header'
import Layout from '@/containers/Layout'

export default function GrupoFlow() {
  const menu = [
    {
      label: 'item 1',
      url: '#'
    },
    {
      label: 'item 2',
      url: '#'
    },
    {
      label: 'item 3',
      url: '#'
    },
    {
      label: 'item 4',
      url: '#'
    }
  ]
  return (
    <Layout>
      <S.Wrapper>
        <Header cta_label="Explorar" cta_link="#" menu_items={menu} />
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
