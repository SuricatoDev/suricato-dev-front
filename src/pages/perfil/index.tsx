import { GetServerSideProps } from 'next'

import { getSession } from 'next-auth/react'

export default function Perfil() {
  return <h1>Perfil</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session }
  }
}
