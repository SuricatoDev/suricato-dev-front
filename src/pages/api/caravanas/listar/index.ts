import type { NextApiRequest, NextApiResponse } from 'next'

import apiBackend from '@/services/apiBackend'
import { AxiosError } from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { categoria, origem, destino, titulo } = req.query

    const params: Record<string, string> = {}
    if (typeof categoria === 'string') params.categoria = categoria
    if (typeof origem === 'string') params.origem = origem
    if (typeof destino === 'string') params.destino = destino
    if (typeof titulo === 'string') params.titulo = titulo

    const response = await apiBackend({
      method: 'GET',
      url: '/caravanas',
      params
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
