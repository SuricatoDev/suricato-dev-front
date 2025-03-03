import LoginForm from '@/components/LoginForm'
import MobileFooter from '@/components/common/MobileFooter'
import Layout from '@/containers/Layout'
import * as S from '@/styles/pages/login/styles'

export default function Login() {
  return (
    <Layout>
      <S.Wrapper>
        <LoginForm />
        <MobileFooter $logged={false} />
      </S.Wrapper>
    </Layout>
  )
}
