import type { NextApiRequest, NextApiResponse } from 'next'

import apiBackend from '@/services/apiBackend'
import { AxiosError } from 'axios'

interface CadastroPayload {
  nome: string
  data_nascimento: string
  telefone: string
  email: string
  password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const response = await apiBackend.post(
      '/register',
      req.body as CadastroPayload
    )
    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    return res
      .status(axiosError.response?.status || 500)
      .json(axiosError.response?.data || { error: 'Erro interno no servidor' })
  }
}
