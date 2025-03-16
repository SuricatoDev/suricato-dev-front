import type { NextApiRequest, NextApiResponse } from 'next'
import apiBackend from '@/services/apiBackend'
import { getToken } from 'next-auth/jwt'
import { AxiosError } from 'axios'
interface CepResponse {
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' })
  }

  const { cep } = req.query

  try {
    const response = await apiBackend({
      method: req.method,
      url: `/cep/${cep}`,
      headers: {
        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`
      },
      data: req.body as CepResponse
    })
    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    return res
      .status(axiosError.response?.status || 500)
      .json(
        axiosError.response?.data || { message: 'Erro interno no servidor' }
      )
  }
}
